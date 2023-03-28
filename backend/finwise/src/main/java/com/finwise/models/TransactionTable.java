package com.finwise.models;

public class TransactionTable {

    private String table;

    public String getTable() {
        return table;
    }

    public void setTable(String table) {
        this.table = table;
    }

    @Override
    public String toString() {
        return "TransactionTable{" +
                "table='" + table + '\'' +
                '}';
    }
}
