import React from 'react'
import {Route, Routes} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {paths} from './paths';
import Books from '../pages/Books/Books';
import Book from '../pages/Books/Book';
import CreateBook from '../pages/Books/CreateBook';
import EditBook from '../pages/Books/EditBook';
import NotFound from '../components/NotFound';

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={paths.index} element={<Books />} />
        <Route path={paths.books} element={<Books />} />
        <Route path={`${paths.books}/:id`} element={<Book />} />
        <Route path={paths.createBook} element={<CreateBook />} />
        <Route path={`${paths.editBook}/:id`} element={<EditBook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default AppRoutes