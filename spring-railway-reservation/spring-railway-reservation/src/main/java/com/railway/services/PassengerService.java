package com.railway.services;

import com.railway.model.Ticket;
import com.railway.model.Passenger;

import java.util.List;

public interface PassengerService {

    List<Passenger> getAllPassengers();

    Passenger createPassenger(Passenger passenger);

    Passenger updatePassenger(Passenger passenger);

//    Passenger deletePassenger(int id);

    Passenger getPassengerById(int id);

}
