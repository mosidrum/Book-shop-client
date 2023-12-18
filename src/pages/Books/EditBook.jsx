import React, { useState, useEffect } from 'react';
import NoImage from '../../assets/no-image-selected.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { paths } from '../../routes/paths';
import { serverUrl } from '../../../utils';

const EditBook = () => {
	const [bookId, setBookId] = useState('');
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [stars, setStars] = useState(1);
	const [categories, setCategories] = useState([]);
	const [description, setDescription] = useState('');
	const [thumbnail, setThumbnail] = useState(null);
	const [image, setImage] = useState('');
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const params = useParams();
	const baseUrl = `${serverUrl}/books/${params.id}`;

	const fetchData = async () => {
		try {
			const response = await fetch(baseUrl);
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			const data = await response.json();
			setTitle(data.title);
			setSlug(data.slug);
			setStars(data.stars);
			setCategories(data.category);
			setDescription(data.description);
			setThumbnail(data.thumbnail);
			setBookId(data._id);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleCategoryChange = (e) => {
		setCategories(e.target.value.split(',').map((category) => category.trim()));
	};

	const onImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImage(URL.createObjectURL(e.target.files[0]));
			setThumbnail(e.target.files[0]);
		}
	};

	const updateBook = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('title', title);
		formData.append('slug', slug);
		formData.append('stars', stars);
		formData.append('description', description);
		formData.append('category', categories);
		formData.append('thumbnail', thumbnail);
		formData.append('bookId', bookId);
		try {
			const response = await fetch(`${serverUrl}/books`, {
				method: 'PUT',
				body: formData,
			});

			if (response.ok) {
				enqueueSnackbar('Book edited successfully', { variant: 'success' });
				navigate(paths.books);
			} else {
				console.log('failed to submit');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1>Edit Book</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
				assumenda eveniet inventore vero, esse aliquam hic officiis accusantium
				error saepe reiciendis, earum in modi nostrum cupiditate possimus
				consequatur nisi minima?
			</p>

			<form
				className="bookdetails"
				onSubmit={updateBook}
			>
				<div className="col-1">
					<label htmlFor="thumbnail">Upload Thumbnail</label>
					{image ? (
						<img
							src={image}
							alt="preview image"
						/>
					) : (
						<img
							src={`${serverUrl}/uploads/${thumbnail}`}
							alt="preview image"
						/>
					)}
					<input
						name="thumbnail"
						type="file"
						accept="image/gif, image/jpeg, image/jpg, image/png"
						onChange={onImageChange}
					/>
				</div>
				<div className="col-2">
					<div>
						<label htmlFor="title">TItle</label>
						<input
							name="title"
							type="text"
							value={title || ''}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="slug">Slug</label>
						<input
							name="slug"
							type="text"
							value={slug || ''}
							onChange={(e) => setSlug(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="stars">Stars</label>
						<select
							name="stars"
							onChange={(e) => setStars(e.target.value)}
							value={stars || ''}
						>
							<option value="1">⭐</option>
							<option value="2">⭐⭐</option>
							<option value="3">⭐⭐⭐</option>
							<option value="4">⭐⭐⭐⭐</option>
							<option value="5">⭐⭐⭐⭐⭐</option>
						</select>
					</div>
					<div>
						<label htmlFor="description">Description</label>
						<textarea
							rows="4"
							cols="50"
							name="description"
							value={description || ''}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="category">Category (seperate with comma)</label>
						<input
							name="category"
							type="text"
							value={categories || []}
							onChange={handleCategoryChange}
						/>
					</div>
					<input type="submit" />
				</div>
			</form>
		</div>
	);
};

export default EditBook;
