export declare type AutocompleteItem = {
    id: number;
    name: string;
};

export class BaseAction {
    private url = '';
    controller = new AbortController();

    /**
     * @argument endpoint
     * Base URL to this endpoint
     */
    constructor(endpoint: string) {
        this.url = this.buildUrl(endpoint);
    }

    async autocomplete(name: string): Promise<AutocompleteItem[] | undefined> {
        const signal = this.controller.signal;
        try {
            var response = await fetch(
                `${this.url}/autocomplete?name=${name}`,
                { signal }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching movies:', error);
            return undefined;
        }
    }

    private buildUrl(endpoint: string) {
        return `${import.meta.env.VITE_API_URL}${endpoint}`;
    }

    abort() {
        this.controller.abort();
        this.controller = new AbortController();
    }
}
