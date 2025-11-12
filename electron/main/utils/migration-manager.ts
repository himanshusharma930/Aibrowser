/**
 * ✅ SECURITY FIX: Data Migration Manager
 *
 * This module handles migration of plain-text API keys to encrypted format.
 * It runs automatically on app startup to ensure existing user data is secured.
 *
 * @module migration-manager
 */

import { store } from './store';
import log from 'electron-log';
import { encryptSensitiveData, isEncryptionAvailable } from './encryption';

/**
 * Migration status stored in electron-store
 */
interface MigrationStatus {
  version: number;
  migratedAt?: string;
  migrations: {
    [key: string]: {
      completed: boolean;
      migratedAt?: string;
      error?: string;
    };
  };
}

/**
 * Current migration version (increment when adding new migrations)
 */
const CURRENT_MIGRATION_VERSION = 1;

/**
 * Get migration status from store
 */
function getMigrationStatus(): MigrationStatus {
  return store.get('migrationStatus', {
    version: 0,
    migrations: {}
  }) as MigrationStatus;
}

/**
 * Update migration status in store
 */
function setMigrationStatus(status: MigrationStatus): void {
  store.set('migrationStatus', status);
}

/**
 * Migration 1: Encrypt existing plain-text API keys
 *
 * Reads existing modelConfigs from electron-store and encrypts all API keys.
 * If encryption is unavailable (e.g., Linux without keyring), marks as completed
 * but keeps data as plain text (with warning logged).
 */
async function migrateApiKeysToEncrypted(): Promise<void> {
  log.info('[Migration] Starting API key encryption migration...');

  try {
    // Check if encryption is available
    if (!isEncryptionAvailable()) {
      log.warn('[Migration] Encryption not available on this system. Skipping API key encryption.');
      return;
    }

    // Get existing model configs
    const existingConfigs = store.get('modelConfigs', {}) as any;

    if (!existingConfigs || Object.keys(existingConfigs).length === 0) {
      log.info('[Migration] No existing model configs found. Nothing to migrate.');
      return;
    }

    // Check if already encrypted (has ENCRYPTED: prefix)
    const hasEncryptedData = JSON.stringify(existingConfigs).includes('ENCRYPTED:');
    if (hasEncryptedData) {
      log.info('[Migration] Model configs already encrypted. Skipping migration.');
      return;
    }

    // Encrypt sensitive data
    log.info('[Migration] Encrypting API keys in model configs...');
    const encryptedConfigs = encryptSensitiveData(existingConfigs);

    // Save encrypted configs back to store
    store.set('modelConfigs', encryptedConfigs);

    log.info('[Migration] ✅ API key encryption migration completed successfully.');
  } catch (error: any) {
    log.error('[Migration] Failed to migrate API keys:', error);
    throw error;
  }
}

/**
 * Run all pending migrations
 *
 * This function should be called during app initialization (in main process)
 * to ensure all data migrations are applied before the app starts.
 */
export async function runMigrations(): Promise<void> {
  const status = getMigrationStatus();

  log.info(`[Migration] Current migration version: ${status.version}, Target version: ${CURRENT_MIGRATION_VERSION}`);

  if (status.version >= CURRENT_MIGRATION_VERSION) {
    log.info('[Migration] All migrations up to date. No action needed.');
    return;
  }

  // Migration 1: Encrypt API keys
  if (!status.migrations['encrypt-api-keys']?.completed) {
    try {
      await migrateApiKeysToEncrypted();

      status.migrations['encrypt-api-keys'] = {
        completed: true,
        migratedAt: new Date().toISOString()
      };
    } catch (error: any) {
      status.migrations['encrypt-api-keys'] = {
        completed: false,
        error: error.message
      };
      throw error;
    }
  }

  // Update migration status
  status.version = CURRENT_MIGRATION_VERSION;
  status.migratedAt = new Date().toISOString();
  setMigrationStatus(status);

  log.info('[Migration] ✅ All migrations completed successfully.');
}

/**
 * Reset migration status (for testing purposes only)
 * ⚠️ WARNING: This will cause migrations to run again on next app start
 */
export function resetMigrationStatus(): void {
  log.warn('[Migration] Resetting migration status (testing only)');
  store.delete('migrationStatus');
}

/**
 * Get current migration status for debugging
 */
export function getMigrationInfo(): MigrationStatus {
  return getMigrationStatus();
}
