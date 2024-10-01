import {
    Autocomplete,
    CircularProgress,
    Container,
    TextField,
} from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AutocompleteItem } from '../../actions/base.action';
import { MoviesAction } from '../../actions/movies.action';

export const HomePage = () => {
    const [movies, setMovies] = useState<AutocompleteItem[] | undefined | null>(
        null
    );
    const refMovieAction = useRef<{
        action: MoviesAction;
        debounce: NodeJS.Timeout | string | number | undefined;
    }>({
        action: new MoviesAction(),
        debounce: undefined,
    });

    const LOADING = movies === null;

    useEffect(() => {
        fetchMovies();
    }, []);

    function fetchMovies(search: string = '') {
        refMovieAction.current.action.autocomplete(search).then((movies) => {
            setMovies(movies);
        });
    }

    function handleChangeSearch(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
        clearTimeout(refMovieAction.current.debounce);
        refMovieAction.current.action.abort();
        refMovieAction.current.debounce = window.setTimeout(() => {
            setMovies(null);
            fetchMovies(event.target.value);
        }, 50);
    }

    return (
        <Container sx={{ p: 3 }} maxWidth="lg">
            <Autocomplete
                options={movies ?? []}
                clearOnBlur={false}
                getOptionLabel={(movie) => movie.name}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search your movie title here"
                        size="small"
                        onChange={handleChangeSearch}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {LOADING ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                            sx={{ marginRight: '25px' }}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        </Container>
    );
};
