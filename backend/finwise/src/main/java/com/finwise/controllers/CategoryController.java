package com.finwise.controllers;

import com.finwise.models.Category;
import com.finwise.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "{user_id}/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping
    public List<Category> getCategory(@PathVariable("user_id") int userId){
        return categoryService.getAllCategories(userId);
    }

    @PostMapping("/create")
    public Category createCategory(@RequestBody Category category,@PathVariable("user_id") int userId){
        return categoryService.createCategory(category,userId);
    }

    @PutMapping("/update")
    public Category updateCategory(@RequestBody Category category,@PathVariable("user_id") int userId){
        return categoryService.updateCategory(category,userId);
    }

    @DeleteMapping("/{id}")
    public Category deleteCategory(@PathVariable("id") int id){
        return categoryService.deleteCategory(id);
    }

    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable("id") int id){
        return categoryService.getCategoryById(id);
    }
}
