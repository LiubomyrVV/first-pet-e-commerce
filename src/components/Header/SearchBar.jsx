import { Link } from 'react-router-dom'
import styles from './header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { searchProduct } from '../../functions/functions'
import { disableBurger } from '../../features/user/userSlice'

const SearchBar = () => {
    const dispatch = useDispatch()

    const categories = useSelector(({ categories }) => categories)
    const [searchValue, setSearchValue] = useState('')
    const [searched, setSearched] = useState([])

    const products = useSelector(({ products }) => products.list)
    useEffect(() => {
        setSearched(products.filter(product => searchProduct(product, searchValue)))
    }, [searchValue, products])
    const handleOnSearchItem = () => {
        dispatch(disableBurger())

    }
    return (

        <form className={styles.input}>
            <div className={styles.searchContainer}>
                <div className={styles.icon}>
                    <i className="bi bi-search"></i>
                </div>
                <input
                    name='search'
                    type='search'
                    placeholder='Search for something'
                    autoComplete='off'
                    onChange={e => setSearchValue(e.target.value)}
                    value={searchValue}
                />
            </div>


            <ul className={styles.searched} style={{
                display: searchValue !== '' && searched.length ? 'flex' : 'none'
            }}>
                {searched.map(({ category, title, id }) => {
                    return <Link
                        to={`/categories/${categories.list.indexOf(category)}/${id}`}
                        key={id}
                        onClick={handleOnSearchItem}
                    >{title}</Link>
                })}

            </ul>
        </form>
    )
}


export default SearchBar