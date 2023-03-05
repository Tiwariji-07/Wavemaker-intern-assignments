package com.finwise.models;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transactions {
    @Id
    @Column(name = "id")
    private int transactionId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "category_id")
//    @ColumnDefault("-1")
    private Integer categoryId;

    @Column(name = "transaction_type_id")
    private int transactionTypeId;

    @Column(name = "transaction_month")
    private int transactionMonth;

    @Column(name = "transaction_year")
    private int transactionYear;

    @Column(name = "debit_amount")
    private float debitAmount;

    @Column(name = "credit_amount")
    private float creditAmount;

    @Column(name = "description")
    private String description;

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public int getTransactionTypeId() {
        return transactionTypeId;
    }

    public void setTransactionTypeId(int transactionTypeId) {
        this.transactionTypeId = transactionTypeId;
    }

    public int getTransactionMonth() {
        return transactionMonth;
    }

    public void setTransactionMonth(int transactionMonth) {
        this.transactionMonth = transactionMonth;
    }

    public int getTransactionYear() {
        return transactionYear;
    }

    public void setTransactionYear(int transactionYear) {
        this.transactionYear = transactionYear;
    }

    public float getDebitAmount() {
        return debitAmount;
    }

    public void setDebitAmount(float debitAmount) {
        this.debitAmount = debitAmount;
    }

    public float getCreditAmount() {
        return creditAmount;
    }

    public void setCreditAmount(float creditAmount) {
        this.creditAmount = creditAmount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Transactions{" +
                "transactionId=" + transactionId +
                ", userId=" + userId +
                ", categoryId=" + categoryId +
                ", transactionTypeId=" + transactionTypeId +
                ", transactionMonth=" + transactionMonth +
                ", transactionYear=" + transactionYear +
                ", debitAmount=" + debitAmount +
                ", creditAmount=" + creditAmount +
                ", description='" + description + '\'' +
                '}';
    }
}
