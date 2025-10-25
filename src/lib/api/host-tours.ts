export interface HostToursParams {
    status?: 'ACTIVE' | 'APPROVED' | 'INACTIVE';
    query?: string;
    page?: number;
    limit?: number;
}

export interface HostToursResponse {
    tours: any[];
    total: number;
    hasMore: boolean;
}

export async function fetchHostTours(params: HostToursParams): Promise<HostToursResponse> {
    const queryParams = new URLSearchParams();

    if (params.status) queryParams.set('status', params.status);
    if (params.query) queryParams.set('query', params.query);
    if (params.page) queryParams.set('page', params.page.toString());
    if (params.limit) queryParams.set('limit', params.limit.toString());

    const response = await fetch(`/api/tours/host/my-tours?${queryParams.toString()}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch host tours');
    }

    return response.json();
}