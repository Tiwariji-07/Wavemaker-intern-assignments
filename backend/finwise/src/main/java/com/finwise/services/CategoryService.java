package com.finwise.services;

import com.finwise.models.BudgetPeriod;
import com.finwise.models.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories(int userId);

    Category createCategory(Category category,int userId);

    Category updateCategory(Category category,int userId);

    Category deleteCategory(int id);

    Category getCategoryById(int id);

    List<Category> getUnusedCategories(BudgetPeriod budgetPeriod,int userId);
}
