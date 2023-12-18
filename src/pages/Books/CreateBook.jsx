import React, { useState } from 'react';
import NoImage from '../../assets/no-image-selected.jpg';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { paths } from '../../routes/paths';
import { serverUrl } from '../../../utils';

const CreateBook = () => {
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [stars, setStars] = useState(1);
	const [categories, setCategories] = useState([]);
	const [description, setDescription] = useState('');
	const [thumbnail, setThumbnail] = useState(null);
  const [image, setImage] = useState(NoImage);
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setCategories(e.target.value.split(',').map((category) => category.trim()))
  }

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  }

	const createBook = async (e) => {
		e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('stars', stars);
    formData.append('description', description);
    formData.append('category', categories);
    formData.append('thumbnail', thumbnail);
		try {

			const response = await fetch(`${serverUrl}/books`, {
				method: 'POST',
				body: formData
			});

			// const response = await fetch('http://localhost:8000/books', {
			// 	method: 'POST',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify({
			// 		title,
			// 		slug,
      //     stars,
      //     description,
      //     category: categories
			// 	}),
			// });
			if (response.ok) {
				enqueueSnackbar('Book created successfully', { variant: 'success' });
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
			<h1>Create Book</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
				assumenda eveniet inventore vero, esse aliquam hic officiis accusantium
				error saepe reiciendis, earum in modi nostrum cupiditate possimus
				consequatur nisi minima?
			</p>

			<form
				className="bookdetails"
				onSubmit={createBook}
			>
				<div className="col-1">
					<label htmlFor="thumbnail">Upload Thumbnail</label>
					<img
						src={image}
						alt="preview image"
					/>
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
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="slug">Slug</label>
						<input
							name="slug"
							type="text"
							value={slug}
							onChange={(e) => setSlug(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="stars">Stars</label>
						<select
							name="stars"
							onChange={(e) => setStars(e.target.value)}
							value={stars}
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
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
          <div>
						<label htmlFor="category">Category (seperate with comma)</label>
						<input
							name="category"
							type="text"
							value={categories}
							onChange={handleCategoryChange}
						/>
					</div>
					<input type="submit" />
				</div>
			</form>
		</div>
	);
};

export default CreateBook;
