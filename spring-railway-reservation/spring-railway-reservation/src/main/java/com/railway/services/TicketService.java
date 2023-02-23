package com.railway.services;

import com.railway.model.Passenger;
import com.railway.model.Ticket;

import java.util.List;

public interface TicketService {

    List<Ticket> getAllTickets();

    Ticket createTicket(Ticket ticket);

    Ticket updateTicket(Ticket ticket);


    Ticket getTicketById(int id);
    List<Passenger> getPassengersOfTicket(int id);
}
