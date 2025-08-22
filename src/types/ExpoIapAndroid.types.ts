import {PurchaseCommon, ProductCommon} from '../ExpoIap.types';

type ProductAndroidOneTimePurchaseOfferDetail = {
  priceCurrencyCode: string;
  formattedPrice: string;
  priceAmountMicros: string;
};

type PricingPhaseAndroid = {
  formattedPrice: string;
  priceCurrencyCode: string;
  // P1W, P1M, P1Y
  billingPeriod: string;
  billingCycleCount: number;
  priceAmountMicros: string;
  recurrenceMode: number;
};

type PricingPhasesAndroid = {
  pricingPhaseList: PricingPhaseAndroid[];
};

type ProductSubscriptionAndroidOfferDetail = {
  basePlanId: string;
  offerId: string | null;
  offerToken: string;
  offerTags: string[];
  pricingPhases: PricingPhasesAndroid;
};

export type ProductAndroid = ProductCommon & {
  nameAndroid: string;
  oneTimePurchaseOfferDetailsAndroid?: ProductAndroidOneTimePurchaseOfferDetail;
  platform: "android";
  subscriptionOfferDetailsAndroid?: ProductSubscriptionAndroidOfferDetail[];
  /**
   * @deprecated Use `nameAndroid` instead. This field will be removed in v2.9.0.
   */
  name?: string;
  /**
   * @deprecated Use `oneTimePurchaseOfferDetailsAndroid` instead. This field will be removed in v2.9.0.
   */
  oneTimePurchaseOfferDetails?: ProductAndroidOneTimePurchaseOfferDetail;
  /**
   * @deprecated Use `subscriptionOfferDetailsAndroid` instead. This field will be removed in v2.9.0.
   */
  subscriptionOfferDetails?: ProductSubscriptionAndroidOfferDetail[];
};

type ProductSubscriptionAndroidOfferDetails = {
  basePlanId: string;
  offerId: string | null;
  offerToken: string;
  pricingPhases: PricingPhasesAndroid;
  offerTags: string[];
};

export type ProductSubscriptionAndroid = ProductAndroid & {
  subscriptionOfferDetailsAndroid: ProductSubscriptionAndroidOfferDetails[];
  /**
   * @deprecated Use `subscriptionOfferDetailsAndroid` instead. This field will be removed in v2.9.0.
   */
  subscriptionOfferDetails?: ProductSubscriptionAndroidOfferDetails[];
};

// Legacy naming for backward compatibility
export type SubscriptionProductAndroid = ProductSubscriptionAndroid;

export type RequestPurchaseAndroidProps = {
  skus: string[];
  obfuscatedAccountIdAndroid?: string;
  obfuscatedProfileIdAndroid?: string;
  isOfferPersonalized?: boolean; // For AndroidBilling V5 https://developer.android.com/google/play/billing/integrate#personalized-price
};

enum ReplacementModesAndroid {
  UNKNOWN_REPLACEMENT_MODE = 0,
  WITH_TIME_PRORATION = 1,
  CHARGE_PRORATED_PRICE = 2,
  WITHOUT_PRORATION = 3,
  CHARGE_FULL_PRICE = 5,
  DEFERRED = 6,
}

type SubscriptionOffer = {
  sku: string;
  offerToken: string;
};

export type RequestSubscriptionAndroidProps = RequestPurchaseAndroidProps & {
  /**
   * @deprecated Use `purchaseToken` instead. This field will be removed in a future version.
   */
  purchaseTokenAndroid?: string;
  replacementModeAndroid?: ReplacementModesAndroid;
  subscriptionOffers: SubscriptionOffer[];
};

export type ReceiptAndroid = {
  autoRenewing: boolean;
  betaProduct: boolean;
  cancelDate: number | null;
  cancelReason: string;
  deferredDate: number | null;
  deferredSku: number | null;
  freeTrialEndDate: number;
  gracePeriodEndDate: number;
  parentProductId: string;
  productId: string;
  productType: string;
  purchaseDate: number;
  quantity: number;
  receiptId: string;
  renewalDate: number;
  term: string;
  termSku: string;
  testTransaction: boolean;
};

export enum FeatureTypeAndroid {
  /** Show in-app messages. Included in documentation by the annotations: */
  IN_APP_MESSAGING = 'IN_APP_MESSAGING',
  /** Launch a price change confirmation flow. */
  PRICE_CHANGE_CONFIRMATION = 'PRICE_CHANGE_CONFIRMATION',
  /** Play billing library support for querying and purchasing with ProductDetails. */
  PRODUCT_DETAILS = 'PRODUCT_DETAILS',
  /** Purchase/query for subscriptions. */
  SUBSCRIPTIONS = 'SUBSCRIPTIONS',
  /** Subscriptions update/replace. */
  SUBSCRIPTIONS_UPDATE = 'SUBSCRIPTIONS_UPDATE',
}

export enum PurchaseAndroidState {
  UNSPECIFIED_STATE = 0,
  PURCHASED = 1,
  PENDING = 2,
}

// Legacy naming for backward compatibility
/**
 * @deprecated Use `PurchaseAndroidState` instead. This enum will be removed in v2.9.0.
 */
export const PurchaseStateAndroid = PurchaseAndroidState;

// Legacy naming for backward compatibility
export type ProductPurchaseAndroid = PurchaseCommon & {
  platform: "android";
  /**
   * @deprecated Use `purchaseToken` instead. This field will be removed in a future version.
   */
  purchaseTokenAndroid?: string;
  dataAndroid?: string;
  signatureAndroid?: string;
  autoRenewingAndroid?: boolean;
  purchaseStateAndroid?: PurchaseAndroidState;
  isAcknowledgedAndroid?: boolean;
  packageNameAndroid?: string;
  developerPayloadAndroid?: string;
  obfuscatedAccountIdAndroid?: string;
  obfuscatedProfileIdAndroid?: string;
};

// Preferred naming
export type PurchaseAndroid = ProductPurchaseAndroid;

// Legacy type aliases for backward compatibility
/**
 * @deprecated Use `ProductAndroidOneTimePurchaseOfferDetail` instead. This type will be removed in v2.9.0.
 */
export type OneTimePurchaseOfferDetails = ProductAndroidOneTimePurchaseOfferDetail;

/**
 * @deprecated Use `ProductSubscriptionAndroidOfferDetail` instead. This type will be removed in v2.9.0.
 */
export type SubscriptionOfferDetail = ProductSubscriptionAndroidOfferDetail;

/**
 * @deprecated Use `ProductSubscriptionAndroidOfferDetails` instead. This type will be removed in v2.9.0.
 */
export type SubscriptionOfferAndroid = ProductSubscriptionAndroidOfferDetails;
