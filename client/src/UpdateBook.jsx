import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const UpdateBook = () =>
{

    const {id} = useParams()
    const[ values, setValues] = useState(
        {
            publisher: "",
            name: "",
            price: "",
            date: "",
        })
        const navigate = useNavigate()

        const handleSubmit =(e) =>{
            e.preventDefault()
            axios.put(`http://localhost:3030/books/${id}`, values)
            .then(()=> navigate("/"))
            .catch(err =>console.log(err))
        }

        useEffect(()=>{
       axios.get(`http://localhost:3030/books/${id}`)
        .then((res) => setValues({...values, publisher: res.data.publisher, name: res.data.name, price: res.data.price, date: res.data.date}))
        .catch(err => console.log(err))
    },[id]);

    return(
        <>
        <div className='d-flex align-items-center flex-column mt-3'>
            <h1>Update a Book</h1>
            <form className='w-50' onSubmit={handleSubmit}>

            <div classname="mb-3 mt-3">
            <label for="publisher" class="form-label">Publisher:</label>
            <input type="text" class="form-control" id="publisher" value={values.publisher} placeholder="Enter Publisher Name" name="publisher" onChange={(e)=>setValues({...values, publisher: e.target.value})}/>
            </div>

            <div classname="mb-3">
            <label for="bookname" class="form-label">Book Name:</label>
            <input type="text" class="form-control" value={values.name}  placeholder="Enter Book Name" name="bookname" onChange={(e)=>setValues({...values, name: e.target.value})}/>
            </div>

            <div classname="mb-3">
            <label for="bookprice" class="form-label">Book Price:</label>
            <input type="text" class="form-control" value={values.price}  placeholder="Enter Book Price" name="bookprice" onChange={(e)=>setValues({...values, price: e.target.value})}/>
            </div>

            <div classname="mb-3 mt-3">
            <label for="publishdate" class="form-label" onChange={(e)=>setValues({...values, date: e.target.value})}>Publish Date:</label>
            <input type="date" class="form-control" value={values.date} id="publishdate" />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}
export default UpdateBook;