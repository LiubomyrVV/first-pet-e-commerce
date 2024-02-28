import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './burger.module.scss';

import Options from './Options';
import { disableBurger, enableBurger } from '../../features/user/userSlice';
import { searchProduct, textCutter } from '../../functions/functions';
import { screen } from '../../functions/Screen';


export const Burger = () => {

    const { isBurgerActive } = useSelector(({ user }) => user)


    const dispatch = useDispatch()

    const handleCheckboxChange = () => {
        if (!isBurgerActive) dispatch(enableBurger())
        else dispatch(disableBurger())
    };

    const [checked, setChecked] = useState(false)
    useEffect(() => {
        setChecked(isBurgerActive)
        screen.enableScroll()
    }, [isBurgerActive])


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
        <>
            <div className={styles.burger}>
                <label className={styles.label} htmlFor="check">
                    <input
                        className={styles.input}
                        checked={checked}
                        type="checkbox" id="check"
                        onChange={handleCheckboxChange}
                    />
                    <span className={styles.span} ></span>
                    <span className={styles.span} ></span>
                    <span className={styles.span} ></span>
                </label>

                <div className={styles.burgerContainer}
                    style={{
                        transform: isBurgerActive ? 'translateX(0%)' : 'translateX(100%)'
                    }}
                >

                    <div className={styles.burgerList}>
                        <Options isVisible={isBurgerActive} />
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
                                opacity: searchValue !== '' && searched.length ? '1' : '0'
                            }}>
                                {searched.map(({ category, title, id, price, image }) => {
                                    return <Link
                                        to={`/categories/${categories.list.indexOf(category)}/${id}`}
                                        key={id}
                                        onClick={handleOnSearchItem}
                                        className={styles.item}
                                    >  <img src={image} width='48px' height='48px'></img>
                                        <div>{textCutter(title, 90)}</div>
                                    </Link>
                                })}

                            </ul>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
