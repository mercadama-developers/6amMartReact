import React, {useEffect, useState} from 'react';
import useGetModule from "../react-query/useGetModule";

export const useGetAllModules = () => {
    const {data, refetch, isLoading} = useGetModule()
    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {data,isLoading};
};