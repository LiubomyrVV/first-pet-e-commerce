import { createSelector } from "@reduxjs/toolkit";

const selectProducts = state => state.products.list

export const selectProduct = createSelector(
    [selectProducts, (_, currentProductId) => currentProductId],
    (products, currentProductId) => products.filter(el => el.id === currentProductId)
)