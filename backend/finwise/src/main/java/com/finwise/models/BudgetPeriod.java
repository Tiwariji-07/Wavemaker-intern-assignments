package com.finwise.models;

public class BudgetPeriod {

    private int month;
    private int year;

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    @Override
    public String toString() {
        return "BudgetPeriod{" +
                "month=" + month +
                ", year=" + year +
                '}';
    }
}
