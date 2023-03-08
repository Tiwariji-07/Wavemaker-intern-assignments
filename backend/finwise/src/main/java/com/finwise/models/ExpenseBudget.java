package com.finwise.models;

import javax.persistence.*;

@Entity
@Table(name = "expense_budget")
public class ExpenseBudget {

    @Id
    @Column(name = "id")
    private int expenseBudgetId;
    @Column(name = "user_id")
    private int userId;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;
    @Column(name = "budget_limit")
    private float budgetAmount;
    @Column(name = "spent_amount")
    private float spentAmount;
    @Column(name = "budget_month")
    private int budgetMonth;
    @Column(name = "budget_year")
    private int budgetYear;
    @Column(name = "is_recurring")
    private boolean isRecurring;
    @Column(name = "is_active")
    private boolean isActive;

    public int getExpenseBudgetId() {
        return expenseBudgetId;
    }

    public void setExpenseBudgetId(int expenseBudgetId) {
        this.expenseBudgetId = expenseBudgetId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public float getBudgetAmount() {
        return budgetAmount;
    }

    public void setBudgetAmount(float budgetAmount) {
        this.budgetAmount = budgetAmount;
    }

    public float getSpentAmount() {
        return spentAmount;
    }

    public void setSpentAmount(float spentAmount) {
        this.spentAmount = spentAmount;
    }

    public int getBudgetMonth() {
        return budgetMonth;
    }

    public void setBudgetMonth(int budgetMonth) {
        this.budgetMonth = budgetMonth;
    }

    public int getBudgetYear() {
        return budgetYear;
    }

    public void setBudgetYear(int budgetYear) {
        this.budgetYear = budgetYear;
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

    @Override
    public String toString() {
        return "ExpenseBudget{" +
                "expenseBudgetId=" + expenseBudgetId +
                ", userId=" + userId +
                ", category=" + category +
                ", budgetAmount=" + budgetAmount +
                ", spentAmount=" + spentAmount +
                ", budgetMonth=" + budgetMonth +
                ", budgetYear=" + budgetYear +
                ", isRecurring=" + isRecurring +
                ", isActive=" + isActive +
                '}';
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

}
