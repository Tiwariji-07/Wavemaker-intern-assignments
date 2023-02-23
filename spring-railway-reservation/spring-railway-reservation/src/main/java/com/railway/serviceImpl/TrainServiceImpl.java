package com.railway.serviceImpl;

import com.railway.model.Station;
import com.railway.model.Train;
import com.railway.model.Train;
import com.railway.model.Train;
import com.railway.services.TrainService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainServiceImpl implements TrainService {

    @Autowired
    SessionFactory sessionFactory;

    public List<Train> getAllTrains() {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        List<Train> trainList=session.createQuery("from Train",Train.class).list();
        transaction.commit();
        session.close();
        return trainList;
    }

    public Train createTrain(Train train) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        session.save(train);
        transaction.commit();
        session.close();
        return train;
    }

    public Train updateTrain(Train train) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        session.saveOrUpdate(train);
        transaction.commit();
        session.close();
        return train;
    }

//    public Train deleteTrain(int id) {
//        Session session = sessionFactory.openSession();
//        Transaction transaction= session.beginTransaction();
//        Train train = session.get(Train.class,id);
//        session.delete(train);
//        transaction.commit();
//        session.close();
//        return train;
//    }

    public Train getTrainById(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Train train = session.get(Train.class,id);
        transaction.commit();
        session.close();
        return train;
    }

//    public Train getTrainByName(String trainName) {
//        Session session = sessionFactory.openSession();
//        Transaction transaction = session.beginTransaction();
//        Train train = session.g
//    }

    public Station getSourceStation(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Train train = session.get(Train.class,id);
        transaction.commit();
        session.close();
        return train.getSourceStation();
    }
    public Station getDestinationStation(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Train train = session.get(Train.class,id);
        transaction.commit();
        session.close();
        return train.getDestinationStation();
    }
}
