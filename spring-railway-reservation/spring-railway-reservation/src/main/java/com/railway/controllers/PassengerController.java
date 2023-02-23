package com.railway.controllers;

import com.railway.model.Passenger;
import com.railway.services.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/passenger")
public class PassengerController {
    @Autowired
    PassengerService passengerService;

    @GetMapping
    public List<Passenger> getPassenger(){
        return passengerService.getAllPassengers();
    }

    @PostMapping("/create")
    public Passenger createPassenger(@RequestBody Passenger passenger){
        return passengerService.createPassenger(passenger);
    }

    @PutMapping("/update")
    public Passenger updatePassenger(@RequestBody Passenger passenger){
        return passengerService.updatePassenger(passenger);
    }

//    @DeleteMapping("/{id}")
//    public Passenger deletePassenger(@PathVariable("id") int id){
//        return passengerService.deletePassenger(id);
//    }

    @GetMapping("/{id}")
    public Passenger getPassengerById(@PathVariable("id") int id){
        return passengerService.getPassengerById(id);
    }
}
