<img src="https://github.com/user-attachments/assets/f51a4b1b-b257-47bf-afe7-5ef8692f0594" />

[![Version](http://img.shields.io/npm/v/expo-iap.svg?style=flat-square)](https://npmjs.org/package/expo-iap) [![Download](http://img.shields.io/npm/dm/expo-iap.svg?style=flat-square)](https://npmjs.org/package/expo-iap) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fhyochan%2Fexpo-iap.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fhyochan%2Fexpo-iap?ref=badge_shield&issueType=license)

In App Purchase module in Expo

# Notice

The `expo-iap` module has been migrated from [react-native-iap](https://github.com/dooboolab/react-native-iap). Moving forward, the `react-native-iap` repository will gradually be deprecated, and `expo-iap` will become the actively maintained module. Please take note of this transition. For more details, refer to the [Future Roadmap and Discussion in react-native-iap](https://github.com/dooboolab-community/react-native-iap/discussions/2754). Additionally, you can check the [Current Project Status comment](https://github.com/dooboolab-community/react-native-iap/discussions/2754#discussioncomment-10510249) to stay updated on the project's progress.

# API documentation

- [Documentation](./docs/IAP.md)
- [Error Code Management](./docs/ERROR_CODES.md)

## Error Handling

expo-iap now provides a centralized error code system that works consistently across iOS and Android platforms. This system maps platform-specific error codes to standardized TypeScript enums.

### Error Codes

```typescript
import { ErrorCode } from 'expo-iap';

// Standardized error codes
ErrorCode.E_USER_CANCELLED      // User cancelled the purchase
ErrorCode.E_NETWORK_ERROR       // Network connectivity issue
ErrorCode.E_ITEM_UNAVAILABLE    // Product not available
ErrorCode.E_SERVICE_ERROR       // Store service error
// ... and more
```

### Error Utilities

```typescript
import { 
  mapPlatformError, 
  isUserCancelledError, 
  getUserFriendlyErrorMessage 
} from 'expo-iap';

// Handle purchase errors
try {
  await requestPurchase({ sku: 'product_id' });
} catch (error) {
  if (isUserCancelledError(error)) {
    // User cancelled - don't show error
    return;
  }
  
  // Show user-friendly message
  const message = getUserFriendlyErrorMessage(error);
  Alert.alert('Purchase Failed', message);
}
```

### Platform-Specific Error Mapping

The system automatically maps platform codes:
- **iOS**: Integer codes (0, 1, 2, etc.) → ErrorCode enum
- **Android**: String codes ("E_USER_CANCELLED", etc.) → ErrorCode enum

This ensures consistent error handling regardless of platform.

> Sharing your thoughts—any feedback would be greatly appreciated!

## Sponsors

### <p style="color: gold;">Gold Tier</p>

<a href="https://www.courier.com/?utm_source=react-native-iap&utm_campaign=osssponsors">
    <img width="420" alt="courier_dot_com" src="https://github.com/user-attachments/assets/319d8966-6839-498d-8ead-ce8cc72c3bca" />
</a>

## Past Sponsors

<a href="https://namiml.com"><img src="https://github.com/hyochan/react-native-iap/assets/27461460/89d71f61-bb73-400a-83bd-fe0f96eb726e" width="280"/></a>
