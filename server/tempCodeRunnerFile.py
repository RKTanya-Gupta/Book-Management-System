from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allow React frontend to access backend

# Update with your actual PostgreSQL credentials and database name
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost:5432/booksdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Book model matches your PostgreSQL 'books' table structure
class Book(db.Model):
    __tablename__ = 'books'
    id = db.Column(db.Integer, primary_key=True)
    publisher = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'publisher': self.publisher,
            'name': self.name,
            'price': self.price,
            'date': self.date.strftime('%Y-%m-%d')
        }

# Simple test route
@app.route('/')
def home():
    return "Hello from Flask backend!"

# Get all books
@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books])

# Get single book by id
@app.route('/books/<int:id>', methods=['GET'])
def get_book(id):
    book = Book.query.get_or_404(id)
    return jsonify(book.to_dict())

# Create a new book
@app.route('/books', methods=['POST'])
def create_book():
    data = request.get_json()
    try:
        new_book = Book(
            publisher=data['publisher'],
            name=data['name'],
            price=float(data['price']),
            date=datetime.strptime(data['date'], '%Y-%m-%d').date()
        )
        db.session.add(new_book)
        db.session.commit()
        return jsonify(new_book.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Update existing book
@app.route('/books/<int:id>', methods=['PUT'])
def update_book(id):
    book = Book.query.get_or_404(id)
    data = request.get_json()
    try:
        book.publisher = data.get('publisher', book.publisher)
        book.name = data.get('name', book.name)
        book.price = float(data.get('price', book.price))
        if 'date' in data:
            book.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        db.session.commit()
        return jsonify(book.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/books/<int:id>', methods=['DELETE'])
def delete_book(id):
    book = Book.query.get_or_404(id)
    db.session.delete(book)
    db.session.commit()
    return jsonify({'message': 'Book deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=3030)
