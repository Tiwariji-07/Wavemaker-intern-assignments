package com.railway.serviceImpl;

import com.railway.model.Passenger;
import com.railway.model.Ticket;
import com.railway.model.Ticket;
import com.railway.services.TicketService;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    SessionFactory sessionFactory;

    public List<Ticket> getAllTickets() {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        List<Ticket> ticketList=session.createQuery("from Ticket",Ticket.class).list();
        transaction.commit();
        session.close();
        return ticketList;
    }

    public Ticket createTicket(Ticket ticket) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        session.save(ticket);
        transaction.commit();
        session.close();
        return ticket;
    }

    public Ticket updateTicket(Ticket ticket) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        session.saveOrUpdate(ticket);
        transaction.commit();
        session.close();
        return ticket;
    }

    public Ticket getTicketById(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Ticket ticket = session.get(Ticket.class,id);
        transaction.commit();
        session.close();
        return ticket;
    }

    public List<Passenger> getPassengersOfTicket(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        String sql = "SELECT * FROM passenger WHERE ticket_id = :ticket_id";
        SQLQuery query = session.createSQLQuery(sql);
        query.addEntity(Passenger.class);
        query.setParameter("ticket_id", id);
        List results = query.list();
        transaction.commit();
        session.close();
        return results;
    }


}
