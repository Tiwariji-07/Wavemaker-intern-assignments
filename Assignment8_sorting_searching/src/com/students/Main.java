package com.students;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Main {

    public static List<Students> addStudent(List<Students> students){
        Scanner sc = new Scanner(System.in);
        Students s1 = new Students();
        System.out.println("Enter student's roll no:");
        int rollNo = sc.nextInt();
        sc.nextLine();
        System.out.println("Enter student's name:");
        String name = sc.nextLine();
        System.out.println("Enter student's branch:");
        String branch = sc.nextLine();
        s1.setRollNo(rollNo );
        s1.setName(name);
        s1.setBranch(branch);
        students.add(s1);
        return students;
    }

    public static void displayStudents(List<Students> students){
        for(Students student:students){
            System.out.println(student);
        }
    }
    public static void displaySortedStudents(List<Students> students){
        Collections.sort(students, (usr1, usr2) -> usr1.getRollNo() - (usr2.getRollNo()));
        for(Students student:students){
            System.out.println(student);
        }
    }
    public static void searchStudents(List<Students> students){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter student's roll no:");
        int roll = sc.nextInt();
        sc.nextLine();
        System.out.println("Enter student's name:");
        String name = sc.nextLine();
        System.out.println("Enter student's branch:");
        String branch = sc.nextLine();
        for(Students student : students){
            int roll1 = student.getRollNo();
            String name1 = student.getName();
            String branch1 = student.getBranch();
//            System.out.println(roll+name1+branch1);
            if( roll == roll1 && name1.equals(name) && branch1.equals(branch)){
                System.out.println("This student is in the database\n");
            }else{
                System.out.println("Student not found\n");
            }
        }
    }

    public static void main(String[] args) {
        List<Students> students = new ArrayList<>();
        Students s1 = new Students();
        Scanner sc = new Scanner(System.in);
        while(true){
            System.out.println("Select any one option");
            System.out.println("1.Add student\n" +
                    "2.Display all students\n" +
                    "3.Sort and display students based on id\n" +
                    "4.Search a student\n" +
                    "5.Exit\n");
            int ch;
            ch = sc.nextInt();
            switch(ch){
                case 1: students = addStudent(students);
                break;
                case 2: displayStudents(students);
                break;
                case 3: displaySortedStudents(students);
                break;
                case 4: searchStudents(students);
                break;
                case 5: return;
                default:
                    System.out.println("Wrong input. Enter correctly\n");

            }

        }
    }
}