import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { paths } from '../../routes/paths';
import { useSnackbar } from 'notistack';
import { serverUrl } from '../../../utils';

const Book = () => {
	const baseUrl = `${serverUrl}/books`;
	const [data, setData] = useState([]);
	const params = useParams();
	const id = params.id;
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchdata = async () => {
			try {
				const response = await fetch(`${baseUrl}/${id}`);
				if (!response.ok) {
					throw new Error('Failed to fetch books');
				}
				const book = await response.json();
				setData(book);
			} catch (error) {
				console.log(error);
			}
		};
		fetchdata();
	}, [id]);

	const starRating = (numberOfStarts) => {
		const stars = [];
		for (let i = 0; i < numberOfStarts; i++) {
			stars.push(<span key={i}>⭐</span>);
		}
		return <div>Rating: {stars}</div>;
	};

	const deleteBook = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`${serverUrl}/books/${id}`, {
				method: 'DELETE',
			});
			if (res.ok) {
				enqueueSnackbar('Book deleted successfully', { variant: 'success' });
				navigate(paths.books);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<Link to={paths.books}>📖 Back to Books</Link>
			<div className="bookdetails">
				<div className="col-1">
					<img
						src={
							data?.thumbnail
								? `${serverUrl}/uploads/${data.thumbnail}`
								: ''
						}
						alt={data?.title}
					/>
					<div className="actions">
						<Link to={`${paths.editBook}/${data._id}`}>Edit Book</Link>
						<button
							className="delete"
							onClick={deleteBook}
						>
							Delete Book
						</button>
					</div>
				</div>
				<div className="col-2">
					<h1>{data?.title}</h1>
					<p>{data?.description}</p>
					<div>{data ? starRating(data.stars) : ''}</div>
					<p>Categories </p>
					<ul className='categories'>
						{data?.category?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Book;
