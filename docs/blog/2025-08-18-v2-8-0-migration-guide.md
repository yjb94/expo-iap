---
slug: v2-8-0-migration-guide
title: v2.8.0 Migration Guide - iOS Field Naming Convention Update
authors: [hyochan]
tags: [release, breaking-change, migration]
---

# Migrating to expo-iap v2.8.0

## Breaking Changes

Version 2.8.0 introduces naming convention changes:

1. **iOS suffix convention**: Fields with iOS suffixes now use uppercase `IOS` instead of `Ios`
2. **ID suffix convention**: All fields ending with `ID` now use `Id` instead for consistency (e.g., `subscriptionGroupID` → `subscriptionGroupId`, `bundleID` → `bundleId`)

**Note:** Android field names remain unchanged as they already follow the correct convention (e.g., `autoRenewingAndroid`, `purchaseTokenAndroid`).

<!-- truncate -->

## What Changed

## iOS Changes

### Product Types

**ProductIOS & SubscriptionProductIOS:**

- `displayName` - Product display name
- `isFamilyShareable` - Family sharing availability
- `jsonRepresentation` - JSON representation of product
- `introductoryPriceNumberOfPeriodsIOS` - Introductory price period count
- `introductoryPriceSubscriptionPeriodIOS` - Introductory price period
- `introductoryPriceAsAmountIOS` - Introductory price amount
- `introductoryPricePaymentModeIOS` - Introductory price payment mode
- `subscriptionPeriodNumberIOS` - Subscription period number
- `subscriptionPeriodUnitIOS` - Subscription period unit

**SubscriptionInfo:**

- `subscriptionGroupId` - Subscription group identifier (changed from `subscriptionGroupID`)

### Purchase Types

**ProductPurchaseIOS** includes these StoreKit 2 fields:

- `quantityIOS`, `originalTransactionDateIOS`, `originalTransactionIdentifierIOS`
- `expirationDateIOS`, `webOrderLineItemIdIOS`, `environmentIOS`
- `storefrontCountryCodeIOS`, `appBundleIdIOS`, `productTypeIOS`
- `subscriptionGroupIdIOS`, `isUpgradedIOS`, `ownershipTypeIOS`
- `reasonIOS`, `reasonStringRepresentationIOS`, `transactionReasonIOS`
- `revocationDateIOS`, `revocationReasonIOS`, `offerIOS`
- `priceIOS`, `currencyIOS`, `jwsRepresentationIOS` (deprecated)

**AppTransactionIOS** (iOS 16.0+):

- `appTransactionId` - App transaction identifier (changed from `appTransactionID`)
- `bundleId` - Bundle identifier (changed from `bundleID`)
- `appId` - App identifier (changed from `appID`)
- `appVersionId` - App version identifier (changed from `appVersionID`)

**Breaking Changes - Field Renaming:**

### iOS Suffix Changes (Ios → IOS)

| Old Field Name                     | New Field Name                     |
| ---------------------------------- | ---------------------------------- |
| `quantityIos`                      | `quantityIOS`                      |
| `originalTransactionDateIos`       | `originalTransactionDateIOS`       |
| `originalTransactionIdentifierIos` | `originalTransactionIdentifierIOS` |
| `appBundleIdIos`                   | `appBundleIdIOS`                   |
| `productTypeIos`                   | `productTypeIOS`                   |
| `subscriptionGroupIdIos`           | `subscriptionGroupIdIOS`           |
| `webOrderLineItemIdIos`            | `webOrderLineItemIdIOS`            |
| `expirationDateIos`                | `expirationDateIOS`                |
| `isUpgradedIos`                    | `isUpgradedIOS`                    |
| `ownershipTypeIos`                 | `ownershipTypeIOS`                 |
| `revocationDateIos`                | `revocationDateIOS`                |
| `revocationReasonIos`              | `revocationReasonIOS`              |
| `transactionReasonIos`             | `transactionReasonIOS`             |
| `environmentIos`                   | `environmentIOS`                   |
| `storefrontCountryCodeIos`         | `storefrontCountryCodeIOS`         |
| `reasonIos`                        | `reasonIOS`                        |
| `offerIos`                         | `offerIOS`                         |
| `priceIos`                         | `priceIOS`                         |
| `currencyIos`                      | `currencyIOS`                      |
| `jwsRepresentationIos`             | `jwsRepresentationIOS`             |
| `reasonStringRepresentationIos`    | `reasonStringRepresentationIOS`    |

### ID Suffix Changes (ID → Id)

| Old Field Name        | New Field Name        | Type/Context      |
| --------------------- | --------------------- | ----------------- |
| `subscriptionGroupID` | `subscriptionGroupId` | SubscriptionInfo  |
| `appTransactionID`    | `appTransactionId`    | AppTransactionIOS |
| `bundleID`            | `bundleId`            | AppTransactionIOS |
| `appID`               | `appId`               | AppTransactionIOS |
| `appVersionID`        | `appVersionId`        | AppTransactionIOS |

### Function Parameter Changes

| Function                     | Old Parameter | New Parameter |
| ---------------------------- | ------------- | ------------- |
| `isEligibleForIntroOfferIOS` | `groupID`     | `groupId`     |

## Android Changes

### Product Types

**ProductAndroid & SubscriptionProductAndroid:**

- `name` - Product display name
- `oneTimePurchaseOfferDetails` - One-time purchase offer details
- `subscriptionOfferDetails` - Subscription offer details array

### Purchase Types

**ProductPurchaseAndroid** includes these Android Billing Library fields:

- `ids` - Array of product IDs
- `purchaseTokenAndroid` - Android purchase token (deprecated, use `purchaseToken`)
- `dataAndroid` - Purchase data
- `signatureAndroid` - Purchase signature
- `autoRenewingAndroid` - Auto-renewal status
- `purchaseStateAndroid` - Purchase state enum
- `isAcknowledgedAndroid` - Acknowledgment status
- `packageNameAndroid` - App package name
- `developerPayloadAndroid` - Developer payload
- `obfuscatedAccountIdAndroid` - Obfuscated account ID
- `obfuscatedProfileIdAndroid` - Obfuscated profile ID

### Request Props

**RequestPurchaseAndroidProps:**

- `isOfferPersonalized` - For Android Billing V5 personalized pricing

**No Breaking Changes** - All Android fields maintain existing naming convention.

## How to Migrate

### Step 1: Update Field References

Search your codebase for any references to the old field names and update them:

```typescript
// Before (v2.7.x)
const purchase = await requestPurchase({sku: 'product-id'});
if (purchase.expirationDateIos) {
  console.log('Expires:', purchase.expirationDateIos);
}

// After (v2.8.0)
// Note: requestPurchase API signature has also changed in v2.8.0
const purchase = await requestPurchase({
  request: {
    ios: {sku: 'product-id'},
    android: {skus: ['product-id']},
  },
  type: 'inapp',
});
if (purchase.expirationDateIOS) {
  console.log('Expires:', purchase.expirationDateIOS);
}
```

### Step 2: Update Type Imports and Declarations

Type names have also been updated to use uppercase `IOS`:

```typescript
// Before (v2.7.x)
import {
  ProductIOS,
  ProductPurchaseIos,
  SubscriptionProductIOS,
  ProductStatusIos,
} from 'expo-iap';

// After (v2.8.0)
import {
  ProductIOS,
  ProductPurchaseIOS,
  SubscriptionProductIOS,
  ProductStatusIOS,
} from 'expo-iap';
```

**Note:** The old type names are still available as deprecated aliases for backward compatibility, but we recommend updating to the new names.

### Step 3: Update Type Checks

If you're using TypeScript and checking for iOS-specific fields:

```typescript
// Before (v2.7.x)
if ('expirationDateIos' in purchase) {
  // Handle subscription
}

// After (v2.8.0)
if ('expirationDateIOS' in purchase) {
  // Handle subscription
}
```

### Step 4: Update ID Field References

Update all ID field references to use `Id` instead:

```typescript
// Before (v2.7.x)
const appTransaction = await getAppTransactionIOS();
console.log(appTransaction.bundleID);
console.log(appTransaction.appID);

// After (v2.8.0)
const appTransaction = await getAppTransactionIOS();
console.log(appTransaction.bundleId);
console.log(appTransaction.appId);
```

### Step 5: Update Subscription Helpers

If you're using the subscription helper functions:

```typescript
// Before (v2.7.x)
const subscription = {
  expirationDateIos: purchase.expirationDateIos,
  environmentIos: purchase.environmentIos,
};

// After (v2.8.0)
const subscription = {
  expirationDateIOS: purchase.expirationDateIOS,
  environmentIOS: purchase.environmentIOS,
};
```

## Quick Migration Script

You can use this regex find/replace pattern in your IDE to quickly update most occurrences:

**Find Pattern (Regex):**

```text
\b(\w+)(Ios)\b
```

**Replace Pattern:**

```text
$1IOS
```

⚠️ **Note:** Review each replacement carefully as this might affect non-field references.

## Why This Change?

These changes align with widely-adopted naming conventions:

1. **iOS suffix**: Acronyms at the end of identifiers are written in uppercase (e.g., `dataIOS`, `configIOS`)
2. **ID suffix**: The `Id` convention is more common in modern JavaScript/TypeScript codebases (e.g., `userId`, `productId`, `transactionId`)

This makes the codebase more consistent and follows best practices in the TypeScript/JavaScript ecosystem.

## Need Help?

If you encounter any issues during migration:

- Check our [GitHub Issues](https://github.com/hyochan/expo-iap/issues)
- Join our [Slack community](https://hyo.dev/joinSlack)
- Review the [full documentation](https://expo-iap.hyo.dev)
