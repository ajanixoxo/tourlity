# Tours API and Store Documentation

## API Endpoints

### 1. Explore Tours
GET `/api/tours/explore`
- Query params:
  - `page` (default: 1)
  - `limit` (default: 10)
  - `q` - Search query
  - `type` - Tour type filter
  - `category` - Category filter
  - `minPrice` - Minimum price filter
  - `maxPrice` - Maximum price filter
  - `location` - Location filter
  - `language` - Language filter
- Returns: { tours: Tour[], total: number, hasMore: boolean }

### 2. Home Tours
GET `/api/tours/home`
- No query params
- Returns featured tours (max 6)
- Sorted by rating

### 3. User Tours
GET `/api/tours/user/:userId`
- Requires authentication
- Query params:
  - `page` (default: 1)
  - `limit` (default: 10)
- Returns user's booked tours with booking status
- Only accessible by the user themselves

### 4. Host Tours
GET `/api/tours/host/:hostId`
- Requires authentication
- Query params:
  - `page` (default: 1)
  - `limit` (default: 10)
- Returns host's created tours with additional stats
- Only accessible by the host themselves or admin

### 5. Tour Details
GET `/api/tours/:id`
- Returns full tour details including:
  - Host information
  - Recent reviews
  - Itinerary
  - Accommodation details
  - Tour statistics

## Tour Store (Zustand)

Location: `src/lib/stores/tour-store.ts`

### Usage

```typescript
import { useTourStore } from '@/lib/stores/tour-store';

// In your component
const {
  exploreTours,
  homeTours,
  userTours,
  hostTours,
  tourDetails,
  isLoading,
  error,
  fetchExploreTours,
  fetchHomeTours,
  fetchUserTours,
  fetchHostTours,
  fetchTourDetails,
  invalidateTour,
  clearCache
} = useTourStore();

// Fetch and cache data
await fetchExploreTours(1, 10, { type: 'VIRTUAL' });
await fetchHomeTours();
await fetchUserTours(userId, 1, 10);
await fetchHostTours(hostId, 1, 10);
await fetchTourDetails(tourId);

// Invalidate cached tour
invalidateTour(tourId);

// Clear all cached data
clearCache();
```

### Cache Structure

The store maintains separate caches for different types of tour data:

1. `exploreTours`: Cached by page, limit, and filters
2. `homeTours`: Single cache for featured tours
3. `userTours`: Cached by userId, page, and limit
4. `hostTours`: Cached by hostId, page, and limit
5. `tourDetails`: Cached by tour ID

Each cache entry includes the full response from the API and is automatically updated when the corresponding fetch action is called.

### Performance Considerations

- Responses are cached to prevent redundant API calls
- Cache keys are generated based on query parameters
- Individual tour entries can be invalidated
- Loading and error states are tracked globally