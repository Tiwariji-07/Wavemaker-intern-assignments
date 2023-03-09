package com.finwise.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;

@Entity
@Table(name = "bill_reminder")
public class Bill {

    @Id
    @Column(name = "id")
    private int billId;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "bill_name")
    private String billName;
    @Column(name = "reminder_date")
    private Date reminderDate;
    @Column(name = "bill_amount")
    private float billAmount;
    @Column(name = "is_recurring")
    private boolean isRecurring;
    @Column(name = "is_active")
    private boolean isActive;
//    @Column(name = "description")
//    private String description;

//    private User user;
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }

    public int getBillId() {
        return billId;
    }

    public void setBillId(int billId) {
        this.billId = billId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getBillName() {
        return billName;
    }

    public void setBillName(String billName) {
        this.billName = billName;
    }

    public Date getReminderDate() {
        return reminderDate;
    }

    public void setReminderDate(Date reminderDate) {
        this.reminderDate = reminderDate;
    }

    public float getBillAmount() {
        return billAmount;
    }

    public void setBillAmount(float billAmount) {
        this.billAmount = billAmount;
    }

    public boolean isRecurring() {
        return isRecurring;
    }

    public void setRecurring(boolean recurring) {
        isRecurring = recurring;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }

    @Override
    public String toString() {
        return "Bill{" +
                "billId=" + billId +
                ", userId=" + userId +
                ", billName='" + billName + '\'' +
                ", reminderDate=" + reminderDate +
                ", billAmount=" + billAmount +
                ", isRecurring=" + isRecurring +
                ", isActive=" + isActive +
//                ", description='" + description + '\'' +
//                ", user=" + user +
                '}';
    }
}
