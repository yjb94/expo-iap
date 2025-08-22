import {
  ProductAndroid,
  ProductPurchaseAndroid,
  ProductSubscriptionAndroid,
} from './types/ExpoIapAndroid.types';
import {
  ProductIOS,
  ProductPurchaseIOS,
  ProductSubscriptionIOS,
} from './types/ExpoIapIOS.types';
import {NATIVE_ERROR_CODES} from './ExpoIapModule';

export type ChangeEventPayload = {
  value: string;
};

export type ProductType = 'inapp' | 'subs';

// =============================================================================
// COMMON TYPES (Base types shared across all platforms)
// =============================================================================

export type ProductCommon = {
  id: string;
  title: string;
  description: string;
  type: ProductType;
  displayName?: string;
  displayPrice: string;
  currency: string;
  price?: number;
  debugDescription?: string;
  platform?: string;
};

export type PurchaseCommon = {
  id: string; // Transaction identifier - used by finishTransaction
  productId: string; // Product identifier - which product was purchased
  ids?: string[]; // Product identifiers for purchases that include multiple products
  transactionId?: string; // @deprecated - use id instead
  transactionDate: number;
  transactionReceipt: string;
  purchaseToken?: string; // Unified purchase token (jwsRepresentation for iOS, purchaseToken for Android)
  platform?: string;
};

export type ProductSubscriptionCommon = ProductCommon & {
  type: 'subs';
};

// Define literal platform types for better type discrimination
export type IosPlatform = {platform: 'ios'};
export type AndroidPlatform = {platform: 'android'};

// Platform-agnostic unified product types (public API)
export type Product =
  | (ProductAndroid & AndroidPlatform)
  | (ProductIOS & IosPlatform);

export type SubscriptionProduct =
  | (ProductSubscriptionAndroid & AndroidPlatform)
  | (ProductSubscriptionIOS & IosPlatform);

// Re-export platform-specific types
export type {
  ProductPurchaseAndroid,
  PurchaseAndroid,
  ProductSubscriptionAndroid,
  SubscriptionProductAndroid, // Legacy
} from './types/ExpoIapAndroid.types';
export type {
  ProductPurchaseIOS,
  PurchaseIOS,
  ProductSubscriptionIOS,
  SubscriptionProductIOS, // Legacy
} from './types/ExpoIapIOS.types';

// Union type for platform-specific purchase types
export type ProductPurchase =
  | (ProductPurchaseAndroid & AndroidPlatform)
  | (ProductPurchaseIOS & IosPlatform);

// Union type for platform-specific subscription purchase types
export type SubscriptionPurchase =
  | (ProductPurchaseAndroid & AndroidPlatform & {autoRenewingAndroid: boolean})
  | (ProductPurchaseIOS & IosPlatform);

export type Purchase = ProductPurchase | SubscriptionPurchase;

export type PurchaseResult = {
  responseCode?: number;
  debugMessage?: string;
  code?: string;
  message?: string;
  /**
   * @deprecated Use `purchaseToken` instead. This field will be removed in a future version.
   */
  purchaseTokenAndroid?: string;
  purchaseToken?: string;
};
/**
 * Centralized error codes for expo-iap
 * These are mapped to platform-specific error codes and provide consistent error handling
 */
export enum ErrorCode {
  E_UNKNOWN = 'E_UNKNOWN',
  E_USER_CANCELLED = 'E_USER_CANCELLED',
  E_USER_ERROR = 'E_USER_ERROR',
  E_ITEM_UNAVAILABLE = 'E_ITEM_UNAVAILABLE',
  E_REMOTE_ERROR = 'E_REMOTE_ERROR',
  E_NETWORK_ERROR = 'E_NETWORK_ERROR',
  E_SERVICE_ERROR = 'E_SERVICE_ERROR',
  E_RECEIPT_FAILED = 'E_RECEIPT_FAILED',
  E_RECEIPT_FINISHED_FAILED = 'E_RECEIPT_FINISHED_FAILED',
  E_NOT_PREPARED = 'E_NOT_PREPARED',
  E_NOT_ENDED = 'E_NOT_ENDED',
  E_ALREADY_OWNED = 'E_ALREADY_OWNED',
  E_DEVELOPER_ERROR = 'E_DEVELOPER_ERROR',
  E_BILLING_RESPONSE_JSON_PARSE_ERROR = 'E_BILLING_RESPONSE_JSON_PARSE_ERROR',
  E_DEFERRED_PAYMENT = 'E_DEFERRED_PAYMENT',
  E_INTERRUPTED = 'E_INTERRUPTED',
  E_IAP_NOT_AVAILABLE = 'E_IAP_NOT_AVAILABLE',
  E_PURCHASE_ERROR = 'E_PURCHASE_ERROR',
  E_SYNC_ERROR = 'E_SYNC_ERROR',
  E_TRANSACTION_VALIDATION_FAILED = 'E_TRANSACTION_VALIDATION_FAILED',
  E_ACTIVITY_UNAVAILABLE = 'E_ACTIVITY_UNAVAILABLE',
  E_ALREADY_PREPARED = 'E_ALREADY_PREPARED',
  E_PENDING = 'E_PENDING',
  E_CONNECTION_CLOSED = 'E_CONNECTION_CLOSED',
}

/**
 * Platform-specific error code mappings
 * Maps ErrorCode enum values to platform-specific integer codes
 */
export const ErrorCodeMapping = {
  ios: {
    [ErrorCode.E_UNKNOWN]: 0,
    [ErrorCode.E_SERVICE_ERROR]: 1,
    [ErrorCode.E_USER_CANCELLED]: 2,
    [ErrorCode.E_USER_ERROR]: 3,
    [ErrorCode.E_ITEM_UNAVAILABLE]: 4,
    [ErrorCode.E_REMOTE_ERROR]: 5,
    [ErrorCode.E_NETWORK_ERROR]: 6,
    [ErrorCode.E_RECEIPT_FAILED]: 7,
    [ErrorCode.E_RECEIPT_FINISHED_FAILED]: 8,
    [ErrorCode.E_DEVELOPER_ERROR]: 9,
    [ErrorCode.E_PURCHASE_ERROR]: 10,
    [ErrorCode.E_SYNC_ERROR]: 11,
    [ErrorCode.E_DEFERRED_PAYMENT]: 12,
    [ErrorCode.E_TRANSACTION_VALIDATION_FAILED]: 13,
    [ErrorCode.E_NOT_PREPARED]: 14,
    [ErrorCode.E_NOT_ENDED]: 15,
    [ErrorCode.E_ALREADY_OWNED]: 16,
    [ErrorCode.E_BILLING_RESPONSE_JSON_PARSE_ERROR]: 17,
    [ErrorCode.E_INTERRUPTED]: 18,
    [ErrorCode.E_IAP_NOT_AVAILABLE]: 19,
    [ErrorCode.E_ACTIVITY_UNAVAILABLE]: 20,
    [ErrorCode.E_ALREADY_PREPARED]: 21,
    [ErrorCode.E_PENDING]: 22,
    [ErrorCode.E_CONNECTION_CLOSED]: 23,
  },
  android: {
    [ErrorCode.E_UNKNOWN]: 'E_UNKNOWN',
    [ErrorCode.E_USER_CANCELLED]: 'E_USER_CANCELLED',
    [ErrorCode.E_USER_ERROR]: 'E_USER_ERROR',
    [ErrorCode.E_ITEM_UNAVAILABLE]: 'E_ITEM_UNAVAILABLE',
    [ErrorCode.E_REMOTE_ERROR]: 'E_REMOTE_ERROR',
    [ErrorCode.E_NETWORK_ERROR]: 'E_NETWORK_ERROR',
    [ErrorCode.E_SERVICE_ERROR]: 'E_SERVICE_ERROR',
    [ErrorCode.E_RECEIPT_FAILED]: 'E_RECEIPT_FAILED',
    [ErrorCode.E_RECEIPT_FINISHED_FAILED]: 'E_RECEIPT_FINISHED_FAILED',
    [ErrorCode.E_NOT_PREPARED]: 'E_NOT_PREPARED',
    [ErrorCode.E_NOT_ENDED]: 'E_NOT_ENDED',
    [ErrorCode.E_ALREADY_OWNED]: 'E_ALREADY_OWNED',
    [ErrorCode.E_DEVELOPER_ERROR]: 'E_DEVELOPER_ERROR',
    [ErrorCode.E_BILLING_RESPONSE_JSON_PARSE_ERROR]:
      'E_BILLING_RESPONSE_JSON_PARSE_ERROR',
    [ErrorCode.E_DEFERRED_PAYMENT]: 'E_DEFERRED_PAYMENT',
    [ErrorCode.E_INTERRUPTED]: 'E_INTERRUPTED',
    [ErrorCode.E_IAP_NOT_AVAILABLE]: 'E_IAP_NOT_AVAILABLE',
    [ErrorCode.E_PURCHASE_ERROR]: 'E_PURCHASE_ERROR',
    [ErrorCode.E_SYNC_ERROR]: 'E_SYNC_ERROR',
    [ErrorCode.E_TRANSACTION_VALIDATION_FAILED]:
      'E_TRANSACTION_VALIDATION_FAILED',
    [ErrorCode.E_ACTIVITY_UNAVAILABLE]: 'E_ACTIVITY_UNAVAILABLE',
    [ErrorCode.E_ALREADY_PREPARED]: 'E_ALREADY_PREPARED',
    [ErrorCode.E_PENDING]: 'E_PENDING',
    [ErrorCode.E_CONNECTION_CLOSED]: 'E_CONNECTION_CLOSED',
  },
} as const;

export class PurchaseError implements Error {
  constructor(
    public name: string,
    public message: string,
    public responseCode?: number,
    public debugMessage?: string,
    public code?: ErrorCode,
    public productId?: string,
    public platform?: 'ios' | 'android',
  ) {
    this.name = '[expo-iap]: PurchaseError';
    this.message = message;
    this.responseCode = responseCode;
    this.debugMessage = debugMessage;
    this.code = code;
    this.productId = productId;
    this.platform = platform;
  }

  /**
   * Creates a PurchaseError from platform-specific error data
   * @param errorData Raw error data from native modules
   * @param platform Platform where the error occurred
   * @returns Properly typed PurchaseError instance
   */
  static fromPlatformError(
    errorData: any,
    platform: 'ios' | 'android',
  ): PurchaseError {
    const errorCode = errorData.code
      ? ErrorCodeUtils.fromPlatformCode(errorData.code, platform)
      : ErrorCode.E_UNKNOWN;

    return new PurchaseError(
      '[expo-iap]: PurchaseError',
      errorData.message || 'Unknown error occurred',
      errorData.responseCode,
      errorData.debugMessage,
      errorCode,
      errorData.productId,
      platform,
    );
  }

  /**
   * Gets the platform-specific error code for this error
   * @returns Platform-specific error code
   */
  getPlatformCode(): string | number | undefined {
    if (!this.code || !this.platform) return undefined;
    return ErrorCodeUtils.toPlatformCode(this.code, this.platform);
  }
}

/**
 * Utility functions for error code mapping and validation
 */
export const ErrorCodeUtils = {
  /**
   * Gets the native error code for the current platform
   * @param errorCode ErrorCode enum value
   * @returns Platform-specific error code from native constants
   */
  getNativeErrorCode: (errorCode: ErrorCode): string => {
    return NATIVE_ERROR_CODES[errorCode] || errorCode;
  },

  /**
   * Maps a platform-specific error code back to the standardized ErrorCode enum
   * @param platformCode Platform-specific error code (string for Android, number for iOS)
   * @param platform Target platform
   * @returns Corresponding ErrorCode enum value or E_UNKNOWN if not found
   */
  fromPlatformCode: (
    platformCode: string | number,
    platform: 'ios' | 'android',
  ): ErrorCode => {
    const mapping = ErrorCodeMapping[platform];

    for (const [errorCode, mappedCode] of Object.entries(mapping)) {
      if (mappedCode === platformCode) {
        return errorCode as ErrorCode;
      }
    }

    return ErrorCode.E_UNKNOWN;
  },

  /**
   * Maps an ErrorCode enum to platform-specific code
   * @param errorCode ErrorCode enum value
   * @param platform Target platform
   * @returns Platform-specific error code
   */
  toPlatformCode: (
    errorCode: ErrorCode,
    platform: 'ios' | 'android',
  ): string | number => {
    return (
      ErrorCodeMapping[platform][errorCode] ??
      (platform === 'ios' ? 0 : 'E_UNKNOWN')
    );
  },

  /**
   * Checks if an error code is valid for the specified platform
   * @param errorCode ErrorCode enum value
   * @param platform Target platform
   * @returns True if the error code is supported on the platform
   */
  isValidForPlatform: (
    errorCode: ErrorCode,
    platform: 'ios' | 'android',
  ): boolean => {
    return errorCode in ErrorCodeMapping[platform];
  },
};

// ============================================================================
// Enhanced Unified Request Types
// ============================================================================

/**
 * Unified request props that work on both iOS and Android platforms
 * iOS will use 'sku', Android will use 'skus' (or convert sku to skus array)
 */
export interface UnifiedRequestPurchaseProps {
  // Universal properties - works on both platforms
  readonly sku?: string; // Single SKU (iOS native, Android fallback)
  readonly skus?: string[]; // Multiple SKUs (Android native, iOS uses first item)

  // iOS-specific properties (ignored on Android)
  readonly andDangerouslyFinishTransactionAutomatically?: boolean;
  readonly appAccountToken?: string;
  readonly quantity?: number;
  readonly withOffer?: import('./types/ExpoIapIOS.types').PaymentDiscount;

  // Android-specific properties (ignored on iOS)
  readonly obfuscatedAccountIdAndroid?: string;
  readonly obfuscatedProfileIdAndroid?: string;
  readonly isOfferPersonalized?: boolean;
}

// ============================================================================
// New Platform-Specific Request Types (v2.7.0+)
// ============================================================================

/**
 * iOS-specific purchase request parameters
 */
export interface RequestPurchaseIosProps {
  readonly sku: string;
  readonly andDangerouslyFinishTransactionAutomatically?: boolean;
  readonly appAccountToken?: string;
  readonly quantity?: number;
  readonly withOffer?: import('./types/ExpoIapIOS.types').PaymentDiscount;
}

/**
 * Android-specific purchase request parameters
 */
export interface RequestPurchaseAndroidProps {
  readonly skus: string[];
  readonly obfuscatedAccountIdAndroid?: string;
  readonly obfuscatedProfileIdAndroid?: string;
  readonly isOfferPersonalized?: boolean;
}

/**
 * Android-specific subscription request parameters
 */
export interface RequestSubscriptionAndroidProps
  extends RequestPurchaseAndroidProps {
  readonly purchaseTokenAndroid?: string;
  readonly replacementModeAndroid?: number;
  readonly subscriptionOffers: {
    sku: string;
    offerToken: string;
  }[];
}

/**
 * Modern platform-specific request structure (v2.7.0+)
 * Allows clear separation of iOS and Android parameters
 */
export interface RequestPurchasePropsByPlatforms {
  readonly ios?: RequestPurchaseIosProps;
  readonly android?: RequestPurchaseAndroidProps;
}

/**
 * Modern platform-specific subscription request structure (v2.7.0+)
 */
export interface RequestSubscriptionPropsByPlatforms {
  readonly ios?: RequestPurchaseIosProps;
  readonly android?: RequestSubscriptionAndroidProps;
}

/**
 * Modern request purchase parameters (v2.7.0+)
 * This is the recommended API moving forward
 */
export type RequestPurchaseProps = RequestPurchasePropsByPlatforms;

/**
 * Modern request subscription parameters (v2.7.0+)
 * This is the recommended API moving forward
 */
export type RequestSubscriptionProps = RequestSubscriptionPropsByPlatforms;
