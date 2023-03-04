package com.finwise.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "transaction_type")
public class TransactionType {

    @Id
    @Column(name = "id")
    private int transactionTypeId;

    @Column(name = "transaction_type_name")
    private String transactionTypeName;

    public int getTransactionTypeId() {
        return transactionTypeId;
    }

    public void setTransactionTypeId(int transactionTypeId) {
        this.transactionTypeId = transactionTypeId;
    }

    public String getTransactionTypeName() {
        return transactionTypeName;
    }

    public void setTransactionTypeName(String transactionTypeName) {
        this.transactionTypeName = transactionTypeName;
    }

    @Override
    public String toString() {
        return "TransactionType{" +
                "transactionTypeId=" + transactionTypeId +
                ", transactionTypeName='" + transactionTypeName + '\'' +
                '}';
    }
}
