package com.votingSystem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class Main {
//    To add nominee
    public static HashMap<Integer,Nominees> addNominee(HashMap<Integer,Nominees> nomineesHashMap){
        Scanner sc = new Scanner(System.in);
        Nominees nominee = new Nominees();
        System.out.println("Enter Nominee's id no:");
        int nomineeId = sc.nextInt();
        sc.nextLine();
        System.out.println("Enter Nominee's name:");
        String name = sc.nextLine();
        System.out.println("Enter Nominee's age:");
        int age = sc.nextInt();
//        nominee.setNomineeId(nomineeId);
        nominee.setNomineeName(name);
        nominee.setNomineeAge(age);
        nomineesHashMap.put(nomineeId,nominee);
        return nomineesHashMap;
    }

//    To add voter
    public static HashMap<Integer,Voter> addVoter(HashMap<Integer,Voter> voterHashMap){
        Scanner sc = new Scanner(System.in);
        Voter voter = new Voter();
        System.out.println("Enter voter's id no:");
        int voterId = sc.nextInt();
        sc.nextLine();
        if(voterHashMap.containsKey(voterId)){
            System.out.println("Voter with this id already exists, Try Again!");
            return voterHashMap;
        }

        System.out.println("Enter voter's name:");
        String name = sc.nextLine();
        System.out.println("Enter voter's age:");
        int age = sc.nextInt();
        sc.nextLine();
        if(age<18){
            int gap = 18-age;
            System.out.println("You are not eligible to vote, Try after "+gap+" years");
        }else {
//        nominee.setNomineeId(nomineeId);
            voter.setVoterName(name);
            voter.setVoterAge(age);
            voterHashMap.put(voterId,voter);
        }
        return voterHashMap;
    }

//    To display Voters
    public static void displayVoters(HashMap<Integer,Voter> voterHashMap){
        voterHashMap.forEach((id,voter)-> System.out.println("\n"+id+" "+voter.getVoterName())
                );
    }

//    To display nominees
    public static void displayNominees(HashMap<Integer,Nominees> nomineesHashMap){
        nomineesHashMap.forEach((id,nominee)-> System.out.println("\n"+id+" "+nominee.getNomineeName())
                );
    }

//    To vote
    public static HashMap<Integer, ArrayList<String>> vote(HashMap<Integer,Nominees> nomineesHashMap,
                                              HashMap<Integer,Voter> voterHashMap,
                                              HashMap<Integer, ArrayList<String>> votes){
        Scanner sc = new Scanner(System.in);
        System.out.println("\nEnter the Voter's details to cast vote:\n ");
        System.out.println("Enter voter's id: ");
        int voterId = sc.nextInt();
        sc.nextLine();
        System.out.println("Enter voter's name: ");
        String voterName = sc.nextLine();
        voterHashMap.forEach((id,voter)->{
            if(id==voterId && voterName.equals(voter.getVoterName())){
                if(votes.containsKey(id)){
                    System.out.println("Voter has already voted.\n");
                }else{
                    System.out.println("Voter is found, Enter the Nominee's id to vote:\n");
                    nomineesHashMap.forEach((nomineeId,nominee)->{
                        System.out.println(nomineeId+" "+nominee.getNomineeName()+"\n");
                    });
                    System.out.println("Enter the Nominee's id to vote:\n");
                    int votedId = sc.nextInt();
                    if(nomineesHashMap.containsKey(votedId)){
                        if(votes.containsKey(votedId)) {
                            ArrayList<String> listOfVoters = votes.get(votedId);
                            listOfVoters.add(voterName);
                            votes.put(votedId, listOfVoters);
                        }else{
                            ArrayList<String> votersNames = new ArrayList<>();
                            votes.put(votedId,votersNames);
                            ArrayList<String> listOfVoters = votes.get(votedId);
                            listOfVoters.add(voterName);
                            votes.put(votedId, listOfVoters);
                        }
                    }else{
                        System.out.println("Nominee not found\n");
                    }
                }
            }else {
                System.out.println("Voter not found.\n");
            }
        });
        return votes;
    }

    //  results
    public static void results(HashMap<Integer,Nominees> nomineesHashMap,
                               HashMap<Integer,Voter> voterHashMap,
                               HashMap<Integer, ArrayList<String>> votes){
        final int[] maxVotes = {0};
        votes.forEach((votedId,votersNames)->{
            String nomineeName = nomineesHashMap.get(votedId).getNomineeName();
            int voteCount = votersNames.size();
            System.out.println(nomineeName+" "+voteCount+" votes "+votersNames+"\n");
            if(maxVotes[0] < voteCount){
                maxVotes[0] = voteCount;
            }
        });
        ArrayList<String> winner = new ArrayList<>();
        votes.forEach((votedId,votersNames)->{
            String nomineeName = nomineesHashMap.get(votedId).getNomineeName();
            int voteCount = votersNames.size();
            if(maxVotes[0] == voteCount){
                winner.add(nomineeName);
            }
        });
        if(winner.size() > 1){
            System.out.println("It is a tie between\n");
            winner.forEach((name)->{
                System.out.println(name+"\n");
            });
        }else{
            System.out.println("The winner of the election is : "+winner.get(0));
        }
    }
    public static void main(String[] args) {
        HashMap<Integer, Nominees> nomineesHashMap = new HashMap<>();
        HashMap<Integer, Voter> voterHashMap = new HashMap<>();
        HashMap<Integer, ArrayList<String>> votes = new HashMap<>();
        Scanner sc = new Scanner(System.in);
        while(true){
            System.out.println("Select any one option");
            System.out.println("1.Add Nominee\n" +
                    "2.Add Voter\n" +
                    "3.Show all Voters\n" +
                    "4.Show all Nominees\n" +
                    "5.Vote\n" +
                    "6.Results\n" +
                    "7.Exit");
            int ch;
            ch = sc.nextInt();
            switch(ch){
                case 1: nomineesHashMap = addNominee(nomineesHashMap);
                    break;
                case 2: voterHashMap = addVoter(voterHashMap);
                    break;
                case 3: displayVoters(voterHashMap);
                    break;
                case 4: displayNominees(nomineesHashMap);
                    break;
                case 5: votes = vote(nomineesHashMap,voterHashMap,votes);
                    break;
                case 6: results(nomineesHashMap,voterHashMap,votes) ;
                    break;
                case 7: return;
                default:
                    System.out.println("Wrong input. Enter correctly\n");

            }

        }
    }
}