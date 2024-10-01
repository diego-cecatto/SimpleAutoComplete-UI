import {
    Autocomplete,
    CircularProgress,
    Container,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AutocompleteItem } from '../../actions/base.action';
import { MoviesAction } from '../../actions/movies.action';

export const HomePage = () => {
    const [movies, setMovies] = useState<AutocompleteItem[] | undefined | null>(
        null
    );
    const [search, setSearch] = useState('');
    const LOADING = movies === null;

    useEffect(() => {
        const movieAction = new MoviesAction();
        movieAction.autocomplete(search).then((movies) => {
            setMovies(movies);
        });
    }, []);

    return (
        <Container sx={{ p: 3 }} maxWidth="xl">
            <Autocomplete
                options={movies ?? []}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Movies"
                        size="small"
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
