package com.library.service;


import java.sql.SQLException;

public interface BookService {

    void insertBook() throws SQLException;

    void searchBook() throws SQLException;

    void displayBooks() throws SQLException;

    void deleteBook() throws SQLException;
}
