import React, { useEffect, useMemo, useState } from 'react';
import { Pet } from '../../types/Pet';
import { ModalError } from '../../components/ModalError';
import { ModalLoader } from '../../components/ModalLoader';
import { CatalogList } from '../../components/CatalogList';
import { CatalogViewSetter } from '../../components/CatalogViewSetter';
import { CatalogFilter } from '../../components/CatalogFilter';
import { Columns, Pagination } from 'react-bulma-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSearchParams } from 'react-router-dom';
import { QueryNames, SortOrder } from '../../types/ViewControlle';
import * as PetsAction from '../../features/pets';
import {
  FilterQueryNames,
  Filters,
  SelectedFilters,
} from '../../types/Filters';
import { getFilterPets, getPetsAvailableFilters } from '../../api/pets';
import { AxiosError } from 'axios';
import {
  convertFilterToSearchParams,
  parseFitersAPI,
} from '../../utils/helperAPI';

function genPages(items: Pet[], perPage: string) {
  if (perPage === 'all') {
    return [items];
  }
  const parsedCount = parseInt(perPage);
  if (parsedCount <= 0 || typeof parsedCount !== 'number') {
    console.warn("Invalid 'perPage' value. Defaulting to 1.");
    return [items];
  }

  const pages = [];
  const totalItems = items.length;

  const numPages = Math.ceil(totalItems / parsedCount);

  for (let i = 0; i < numPages; i++) {
    const startIndex = i * parsedCount;
    const endIndex = startIndex + parsedCount;

    const page = items.slice(startIndex, endIndex);
    pages.push(page);
  }
  return pages;
}

export const CatalogPage = () => {
  const { filteredPets } = useAppSelector(state => state.pet);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentPage = parseInt(
    searchParams.get(QueryNames.CUR_PAGE) || '1',
    10,
  );
  const itemsPerPage = searchParams.get(QueryNames.PER_PAGE) || '10';

  const [availableFilters, setAvailableFilters] = useState<
    Filters | undefined
  >();

  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true);
      try {
        const res = await getPetsAvailableFilters();
        const data = res?.data;
        if (data) {
          setAvailableFilters(parseFitersAPI(data));
        }
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'message' in error) {
          setError((error as { message?: string }).message || 'Unknown error');
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const pages = useMemo(() => {
    return genPages(filteredPets, itemsPerPage);
  }, [filteredPets, itemsPerPage]);

  const petsToShow = pages[currentPage - 1] || [];

  useEffect(() => {
    const sortOrder =
      (searchParams.get(QueryNames.SORTED) as SortOrder) || 'acc';

    setLoading(true);

    getFilterPets(searchParams)
      .then(res => {
        const data = res?.data;
        dispatch(PetsAction.actions.setFilteredPets(data));
        dispatch(PetsAction.actions.sortFiltered(sortOrder));
      })
      .catch((e: AxiosError) => {
        setError(`Failed to filter pet details: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams, dispatch]);

  function handleQueryChange(newQuery: string) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(FilterQueryNames.SEARCH, newQuery);
    setSearchParams(newParams);
  }

  function handleFilterChange(filters: SelectedFilters) {
    const newParams = new URLSearchParams(convertFilterToSearchParams(filters));
    newParams.set(QueryNames.CUR_PAGE, '1');

    const sortOrder =
      (searchParams.get(QueryNames.SORTED) as SortOrder) || 'acc';

    const perPage = searchParams.get(QueryNames.PER_PAGE) || '10';
    newParams.set(QueryNames.SORTED, sortOrder);
    newParams.set(QueryNames.PER_PAGE, perPage);

    setSearchParams(newParams);
  }

  function handleSortChange(newOrder: SortOrder) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(QueryNames.SORTED, newOrder);
    setSearchParams(newParams);
  }

  function handlePerPageChange(newPerPage: string | number) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(QueryNames.PER_PAGE, newPerPage.toString());
    newParams.set(QueryNames.CUR_PAGE, '1');
    setSearchParams(newParams);
  }

  function handlePageChange(newPage: number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const newParams = new URLSearchParams(searchParams);
    newParams.set(QueryNames.CUR_PAGE, String(newPage));
    setSearchParams(newParams);
  }

  return (
    <div>
      {!!error && (
        <ModalError
          title="Error"
          body={error}
          onClose={() => setError('')}
        />
      )}

      {loading && <ModalLoader />}

      <Columns className="mt-1">
        <Columns.Column size="one-quarter">
          <CatalogFilter
            filterData={availableFilters}
            onChange={handleFilterChange}
          />
        </Columns.Column>

        <Columns.Column>
          <div className="mb-5">
            <CatalogViewSetter
              onPerPage={handlePerPageChange}
              onSearch={handleQueryChange}
              onSort={handleSortChange}
            />
          </div>

          <CatalogList pets={petsToShow} />

          <div className="my-2 pagionation">
            <Pagination
              total={pages.length}
              current={currentPage}
              delta={2}
              next=">"
              previous="<"
              showPrevNext
              autoHide
              showFirstLast
              size="small"
              align="center"
              onChange={e => {
                handlePageChange(e);
              }}
              rounded
            />
          </div>
        </Columns.Column>
      </Columns>
    </div>
  );
};
