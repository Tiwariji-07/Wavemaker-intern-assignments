package com.library;

import com.library.service.BookService;
import com.library.service.BookServiceImpl;

import java.sql.SQLException;
import java.util.Scanner;

public class App
{
    public static void main( String[] args ) throws SQLException {
        Scanner sc = new Scanner(System.in);
        BookService bookService = new BookServiceImpl();
        while(true){
            int option;
            System.out.println("********** Welcome to the library ***********");
            System.out.println("Enter operation number from below to perform it:");
            System.out.println("1.Insert a book" +
                    "\n2.Display all books" +
                    "\n3.Search a book" +
                    "\n4.Delete a book" +
                    "\n5.Exit");
            option = sc.nextInt();
            sc.nextLine();
            switch (option){
                case 1: bookService.insertBook();
                break;
                case 2: bookService.displayBooks();
                break;
                case 3: bookService.searchBook();
                break;
                case 4: bookService.deleteBook();
                break;
                case 5: break;
                default:
                    System.out.println("Enter proper option.");
            }

        }

    }
}
