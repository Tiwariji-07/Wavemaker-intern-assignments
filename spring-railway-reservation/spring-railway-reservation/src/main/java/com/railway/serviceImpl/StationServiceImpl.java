package com.railway.serviceImpl;

import com.railway.model.Station;
import com.railway.model.Station;
import com.railway.services.StationService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationServiceImpl implements StationService {

    @Autowired
    SessionFactory sessionFactory;

    public List<Station> getAllStations() {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        List<Station> stationList=session.createQuery("from Station",Station.class).list();
        transaction.commit();
        session.close();
        return stationList;
    }

    public Station createStation(Station station) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        session.save(station);
        transaction.commit();
        session.close();
        return station;
    }

    public Station updateStation(Station station) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        session.saveOrUpdate(station);
        transaction.commit();
        session.close();
        return station;
    }

    public Station deleteStation(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Station station = session.get(Station.class,id);
        session.delete(station);
        transaction.commit();
        session.close();
        return station;
    }

    public Station getStationById(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Station station = session.get(Station.class,id);
        transaction.commit();
        session.close();
        return station;
    }
}
