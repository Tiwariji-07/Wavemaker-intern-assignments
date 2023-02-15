package com.ipl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;


public class Main {

//    It produces all the possible matches between the teams
    public static ArrayList<Match> possibleCombinations(HashMap<Integer,Team> teams,
                                                        HashMap<Integer,Venue> venues){
//        int day = startDate.getDay();
//        Date matchDay = startDate;
        int middleIndex = (teams.size()/2)-1;
        ArrayList<Match> matches = new ArrayList<>();
        ArrayList<Match> matches1 = new ArrayList<>();
        ArrayList<Match> matches2 = new ArrayList<>();
        ArrayList<ArrayList<Match>> eachTeamMatch = new ArrayList<>();
        ArrayList<Match> jumbledMatches = new ArrayList<>();
//        for(int i = 0; i< 2; i++){
//            if(i==0) {
                for (int j = 0; j < teams.size() - 1; j++) {
                    ArrayList<Match> m1 = new ArrayList<>();
                    for (int k = j + 1; k < teams.size(); k++) {
                        Match match = new Match();
                        match.setTeam1(teams.get(j));
                        match.setTeam2(teams.get(k));
                        match.setMatchPlayed(false);
                        match.setMatchVenue(venues.get(j));
//                        if (i == 0) {
//                            match.setMatchVenue(venues.get(j));
//                        } else {
//                            match.setMatchVenue(venues.get(k));
//                        }
                        matches.add(match);
                        m1.add(match);

                    }
                    eachTeamMatch.add(m1);
                }
//            }
//            else{
//                for (int j = teams.size() - 1; j > 0 ; j--) {
//                    ArrayList<Match> m1 = new ArrayList<>();
//                    for (int k = j - 1; k >= 0; k--) {
//                        Match match = new Match();
//                        match.setTeam1(teams.get(j));
//                        match.setTeam2(teams.get(k));
//                        match.setMatchPlayed(false);
//                        match.setMatchVenue(venues.get(j));
//                        matches.add(match);
//                        m1.add(match);
//                    }
//                    eachTeamMatch.add(m1);
//                }
//            }
//        }
//        for(int i=0;i< matches.size();i++){
//            if(i%2==0){
//                matches1.add(matches.get(i));
//            }else {
//                matches2.add(matches.get(i));
//            }
//        }
//        jumbledMatches.addAll(matches2);
//        jumbledMatches.addAll(matches1);
//        for(int i=0;i<matches.size()/2;i++){
//            jumbledMatches.add(matches.get(i));
//            jumbledMatches.add(matches.get(matches.size()-1-i));
//
//        }
        //semi working
//        for(int i=0;i<eachTeamMatch.size();i++){
//            for(int j=0;j<eachTeamMatch.size();j++){
//                if(i<eachTeamMatch.get(j).size()) {
//                    jumbledMatches.add(eachTeamMatch.get(j).get(i));
//                }
//            }
//        }
        //middle approach
        for(int i =0 ;i<eachTeamMatch.size();i++){
            if(middleIndex < eachTeamMatch.get(i).size()){
                jumbledMatches.add(eachTeamMatch.get(i).get(middleIndex));
                eachTeamMatch.get(i).remove(middleIndex);
            }
        }
        for(int i=0;i<eachTeamMatch.size();i++){
            for(int j=0;j<eachTeamMatch.get(i).size();j++){
                jumbledMatches.add(eachTeamMatch.get(i).get(j));
            }
        }
        return jumbledMatches;
    }

//    It is used to increase the date by one day
    private static Calendar dateIncrementer(Date currentDate, int numberOfDaysToIncrement)
    {
        Calendar cal = Calendar.getInstance();
        cal.setTime(currentDate);
        cal.add(Calendar.DATE, numberOfDaysToIncrement);  // number of days to add

        return cal;
    }

//    It schedules the match in such a way that
//    No teams play on consecutive days
//    Each team plays twice with each other at their home towns
//    Two matches are played on weekends
    private static void scheduler(ArrayList<Match> matches,
                                              HashMap<Integer,Team> teams,
                                              HashMap<Integer,Venue> venues,
                                              Date startDate){
        ArrayList<Match> scheduleMatches = new ArrayList<>();
        ArrayList<Team> busyTeams = new ArrayList<>();
        Date date = startDate;
//        System.out.println(date);
//        int matchIndex=0;
//        int venueIndex=0;
        int totVenues = venues.size();
        int totalMatches = matches.size();
//        int[] trackMatches = new int[totalMatches];
//        int indexOfTracking=0;
        int weekendCount=0;
        int count = 0 ;
        while(totalMatches >0){
            for(Match match : matches){
                if(match.getMatchPlayed() == false){
                    if(!match.getTeam1().getPlaying() && !match.getTeam2().getPlaying()){
                        match.setMatchPlayed(true);
                        match.setMatchDate(date);
                        match.getTeam1().setPlaying(true);
                        busyTeams.add(match.getTeam1());
                        match.getTeam2().setPlaying(true);
                        busyTeams.add(match.getTeam2());
                        scheduleMatches.add(match);
                        totalMatches--;
                        break;
                    }
                }
            }
            System.out.println(date.getDay()+" "+busyTeams);

            if(date.getDay() == 0){
                weekendCount++;
//                count++;
                if(weekendCount<2){
                    continue;
                }else{
                    if(!busyTeams.isEmpty()) {
                        if(busyTeams.size()>4 ) {
                            busyTeams.get(0).setPlaying(false);
                            busyTeams.get(1).setPlaying(false);
                            busyTeams.get(2).setPlaying(false);
                            busyTeams.get(3).setPlaying(false);
                            busyTeams.remove(0);
                            busyTeams.remove(0);
                            busyTeams.remove(0);
                            busyTeams.remove(0);
//                            count++;
                        }
//                        else if(count>=1 && busyTeams.size()==6){
//                            busyTeams.get(0).setPlaying(false);
//                            busyTeams.get(1).setPlaying(false);
//                            busyTeams.remove(0);
//                            busyTeams.remove(0);
//                        }
                    }
                    weekendCount=0;
//                    break;
                }
            }
            else if (date.getDay() == 1) {
//                count++;
//                if(count==1) {
                    if (!busyTeams.isEmpty() ) {
                        if( busyTeams.size()>4){
                            busyTeams.get(0).setPlaying(false);
                            busyTeams.get(1).setPlaying(false);
                            busyTeams.get(2).setPlaying(false);
                            busyTeams.get(3).setPlaying(false);
                            busyTeams.remove(0);
                            busyTeams.remove(0);
                            busyTeams.remove(0);
                            busyTeams.remove(0);
//                            count++;
//                            break;
                        }
//                        else if(count>=1 && busyTeams.size()==4){
//                            busyTeams.get(0).setPlaying(false);
//                            busyTeams.get(1).setPlaying(false);
//                            busyTeams.remove(0);
//                            busyTeams.remove(0);
//                        }
                    }

            }
            else {
                if(date.getDay() == 6 && count>0){
                    weekendCount++;
//                count++;
                    if(weekendCount<2 ){
                        continue;
                    }else{
                        if(!busyTeams.isEmpty() ) {
                            if(busyTeams.size()>2 && count>=1) {
                                busyTeams.get(0).setPlaying(false);
                                busyTeams.get(1).setPlaying(false);
                                busyTeams.remove(0);
                                busyTeams.remove(0);
//                                count++;
                            }
                        }
                            weekendCount=0;
    //                        break;
                    }


                }else {
//                if(count==1) {
                    if (!busyTeams.isEmpty()) {
                        if (count>=1 && busyTeams.size() >=2) {
                            busyTeams.get(0).setPlaying(false);
                            busyTeams.get(1).setPlaying(false);
                            busyTeams.remove(0);
                            busyTeams.remove(0);
//                            count++;
//                            break;
                        }
//                        else if(busyTeams.size()==8){
//                            busyTeams.get(0).setPlaying(false);
//                            busyTeams.get(1).setPlaying(false);
//                            busyTeams.get(2).setPlaying(false);
//                            busyTeams.get(3).setPlaying(false);
//                            busyTeams.remove(0);
//                            busyTeams.remove(0);
//                            busyTeams.remove(0);
//                            busyTeams.remove(0);
//                        }
                    }
//                    count=0;
//                }
//                else{
//                    continue;
//                }

                }

            }
//            if(count>1 && busyTeams.size()==2){
//                busyTeams.get(0).setPlaying(false);
//                busyTeams.get(1).setPlaying(false);
//                busyTeams.remove(0);
//                busyTeams.remove(0);
//            }
//            if(count==55){
//                break;
//            }
            System.out.println(date.getDay()+" "+busyTeams);
            count++;
            date = dateIncrementer(date, 1).getTime();
        }
        System.out.println(date.getDay()+" "+busyTeams);
        for(Match match : scheduleMatches){
            System.out.println(match.getTeam1().getTeamName()+" vs "+match.getTeam2().getTeamName()+" "+match.getMatchDate()+" at "+match.getMatchVenue().getVenueName());
        }
        System.out.println(scheduleMatches.size());
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        HashMap<Integer,Team> teams = new HashMap();
        HashMap<Integer,Venue> venues = new HashMap<>();
        ArrayList<Match> matches = new ArrayList<>();
        ArrayList<ArrayList<Match>> newMatches = new ArrayList<>();
        int noOfTeams;
        Date startDate;
        startDate = null;
        System.out.println("****** Welcome to the IPL match scheduling app ******");
        System.out.println("Enter the number of teams participating in this tournament(minimum 8 teams): ");
        noOfTeams = sc.nextInt();
        sc.nextLine();
        int count = 0;
        System.out.println("Enter team name with its venue.");
        while(count < noOfTeams){
            int c = count+1;
            Team team = new Team();
            Venue venue = new Venue();
            System.out.println("Enter name of team "+c);
            String teamName = sc.nextLine();
            System.out.println("Enter venue of team "+c);
            String venueName = sc.nextLine();
            team.setTeamName(teamName);
            team.setPlaying(false);
            venue.setVenueName(venueName);
            venue.setOccupied(false);
//            teams.add(team);
//            venues.add(venue);
            teams.put(count,team);
            venues.put(count,venue);
            count++;
        }

        System.out.println("Now enter the starting date of the tournament (in dd/mm/yyyy format only ):");
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            String date = sc.nextLine();
//            startDate = LocalDate.parse(date, DateTimeFormatter.BASIC_ISO_DATE);
            startDate = sdf.parse(date);
        }

        catch (Exception e){
            e.printStackTrace();
            System.out.println("Program aborted !!");
        }

//        System.out.println(teams);
//        System.out.println(venues);
//        System.out.println(startDate);
//        System.out.println(startDate.getDay());

        matches = possibleCombinations(teams,venues);
        System.out.println(matches);
//        for(Match match:matches){
//            System.out.println(match.getTeam1()+" "+match.getTeam2()+" "+match.getMatchVenue());
//        }
//        for(ArrayList<Match> m : newMatches){
//            System.out.println(m);
//        }
//        System.out.println(newMatches);
//        System.out.println(scheduler(matches,teams,venues,startDate));
        scheduler(matches,teams,venues,startDate);
    }

}