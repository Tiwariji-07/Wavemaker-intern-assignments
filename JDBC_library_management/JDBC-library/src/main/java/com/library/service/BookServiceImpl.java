package com.library.service;

import com.library.Book;

import java.sql.*;
import java.util.Scanner;

public class BookServiceImpl implements BookService {
    Scanner sc = new Scanner(System.in);
    String databaseUrl = "jdbc:mysql://localhost:3306/library";
    String userName = "root";
    String password = "vivek";

    Connection connection;

    {
        try {
            connection = DriverManager.getConnection(databaseUrl,userName,password);
            System.out.println("Connected");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }



    public BookServiceImpl()  {
    }

    public Book retrieveInput(){
        Book book = new Book();
//        System.out.println("Please enter unique book id and book name.");
//        System.out.println("Enter book id:");
//        book.setBookId(sc.nextInt());
//        sc.nextLine();
        System.out.println("Enter book name:");
        book.setBookName(sc.nextLine());
        System.out.println("Enter author's name:");
        book.setBookAuthor(sc.nextLine());
        return book;
    }
    public void insertBook() throws SQLException {
        Book book = new Book();
        book = retrieveInput();
        String query = "INSERT INTO book(book_title,book_author) values (?,?)";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
//        preparedStatement.setInt(1,book.getBookId());
        preparedStatement.setString(1,book.getBookName());
        preparedStatement.setString(2,book.getBookAuthor());
        boolean result = preparedStatement.execute();
        System.out.println(result);
        if(!result){
            System.out.println("Book inserted.\n");
        }else{
            System.out.println("error");
        }
    }

    public void searchBook() throws SQLException {
        int option;

        Statement statement = connection.createStatement();
        PreparedStatement preparedStatement = null;
        System.out.println("1.Search by id\n2.Search by book name\n3.search by author");
        option = sc.nextInt();
        sc.nextLine();
        String query = null;
        switch(option){
            case 1: {
                int searchId;
                System.out.println("Enter book id:");
                searchId = sc.nextInt();
                sc.nextLine();
                query = "SELECT * FROM book where book_id=?";
                preparedStatement = connection.prepareStatement(query);
                preparedStatement.setInt(1,searchId);
            }
            break;
            case 2:{
                String bookName;
                System.out.println("Enter book name:");
                bookName = sc.nextLine();
                query = "SELECT * FROM book where book_title= ?";
                preparedStatement = connection.prepareStatement(query);
                preparedStatement.setString(1,bookName);

            }
            break;
            case 3:{
                String authorName;
                System.out.println("Enter author name:");
                authorName = sc.nextLine();
                query = "SELECT * FROM book where book_author=?";
                preparedStatement = connection.prepareStatement(query);
                preparedStatement.setString(1,authorName);

            }
            break;
            default:
                System.out.println("Incorrect Input");
        }

        ResultSet result = preparedStatement.executeQuery();
        boolean flag = false;
        while (result.next()){
            flag = true;
            int Book_id= Integer.parseInt(result.getString(1));
            String bookName=result.getString(2);
            String bookAuthor=result.getString(3);
            System.out.println("Book Id: "+Book_id+" | Book Name: "+bookName+" | Author "+bookAuthor);

        }
        if(!flag){
            System.out.println("Book not found.");
        }

    }

    public void displayBooks() throws SQLException {
        Statement statement = connection.createStatement();
        String query = "SELECT * FROM book";
        ResultSet result = statement.executeQuery(query);
        while (result.next()){
            int Book_id= Integer.parseInt(result.getString(1));
            String bookName=result.getString(2);
            String bookAuthor=result.getString(3);
            System.out.println("Book Id: "+Book_id+" | Book Name: "+bookName+" | Author "+bookAuthor);

        }
    }

    public void deleteBook() throws SQLException {
        int deletedBookId;
        try {
            displayBooks();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        System.out.println("Enter the book id to delete it.");
        deletedBookId = sc.nextInt();
        String query = "DELETE FROM book WHERE book_id=?";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setInt(1,deletedBookId);
        boolean result = preparedStatement.execute();
        System.out.println(result);
        if(!result){
            System.out.println("Book Deleted\n.");
        }else{
            System.out.println("error");
        }

    }
}
