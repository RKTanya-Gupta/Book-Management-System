import pytest
from app import create_app, db, Book
from datetime import datetime

@pytest.fixture
def client():
    app = create_app({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        "SQLALCHEMY_TRACK_MODIFICATIONS": False
    })

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client

def test_home(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"Hello from Flask backend!" in response.data

def test_create_and_get_book(client):
    # Create book
    new_book = {
        "publisher": "Test Publisher",
        "name": "Test Book",
        "price": 9.99,
        "date": "2025-09-16"
    }
    response = client.post("/books", json=new_book)
    assert response.status_code == 201
    data = response.get_json()
    assert data["name"] == "Test Book"

    # Get book
    book_id = data["id"]
    response = client.get(f"/books/{book_id}")
    assert response.status_code == 200
    book = response.get_json()
    assert book["publisher"] == "Test Publisher"

def test_update_book(client):
    # First create a book
    response = client.post("/books", json={
        "publisher": "Old Pub",
        "name": "Old Name",
        "price": 5.0,
        "date": "2025-09-16"
    })
    book_id = response.get_json()["id"]

    # Update it
    response = client.put(f"/books/{book_id}", json={
        "name": "New Name",
        "price": 12.5
    })
    assert response.status_code == 200
    book = response.get_json()
    assert book["name"] == "New Name"
    assert book["price"] == 12.5

def test_delete_book(client):
    response = client.post("/books", json={
        "publisher": "Del Pub",
        "name": "Delete Me",
        "price": 3.5,
        "date": "2025-09-16"
    })
    book_id = response.get_json()["id"]

    response = client.delete(f"/books/{book_id}")
    assert response.status_code == 200
    assert response.get_json()["message"] == "Book deleted successfully"

    # Confirm deletion
    response = client.get(f"/books/{book_id}")
    assert response.status_code == 404
################################################################

# import pytest
# from app import create_app, db, Book
# from datetime import datetime

# @pytest.fixture
# def client():
#     app = create_app({
#         "TESTING": True,
#         "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"  # in-memory DB for tests
#     })
#     with app.test_client() as client:
#         with app.app_context():
#             db.create_all()
#         yield client
#         with app.app_context():
#             db.drop_all()

# def test_home(client):
#     response = client.get('/')
#     assert response.status_code == 200
#     assert b"Hello from Flask backend!" in response.data

# def test_create_and_get_book(client):
#     response = client.post('/books', json={
#         "publisher": "TestPub",
#         "name": "TestBook",
#         "price": 99.99,
#         "date": "2025-09-16"
#     })
#     assert response.status_code == 201
#     book_id = response.get_json()['id']

#     get_response = client.get(f'/books/{book_id}')
#     data = get_response.get_json()
#     assert get_response.status_code == 200
#     assert data['name'] == "TestBook"

# def test_update_book(client):
#     response = client.post('/books', json={
#         "publisher": "TestPub",
#         "name": "OldBook",
#         "price": 50.0,
#         "date": "2025-09-16"
#     })
#     book_id = response.get_json()['id']

#     update_response = client.put(f'/books/{book_id}', json={
#         "name": "UpdatedBook",
#         "price": 60.0
#     })
#     data = update_response.get_json()
#     assert update_response.status_code == 200
#     assert data['name'] == "UpdatedBook"
#     assert data['price'] == 60.0

# def test_delete_book(client):
#     response = client.post('/books', json={
#         "publisher": "TestPub",
#         "name": "BookToDelete",
#         "price": 30.0,
#         "date": "2025-09-16"
#     })
#     book_id = response.get_json()['id']

#     delete_response = client.delete(f'/books/{book_id}')
#     assert delete_response.status_code == 200
#     assert delete_response.get_json()['message'] == 'Book deleted successfully'

#     get_response = client.get(f'/books/{book_id}')
#     assert get_response.status_code == 404
