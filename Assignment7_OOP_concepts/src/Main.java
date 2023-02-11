import abstraction.Animal;
import abstraction.AnimalInterface;
import constructors.Mammals;
import polymorphism.Reptile;

class Dog implements AnimalInterface {

    @Override
    public void talk() {
        System.out.println("I am a dog");
    }
}

class Cat extends Animal{
    @Override
    public void walk() {
        System.out.println("Cat walks on four legs");
    }
}

class Crocodile extends Reptile{
    @Override
    public void species() {
        System.out.println("It is a crocodile");
    }

    @Override
    public void species(String name) {
        super.species(name+" It is passed to super class");
        System.out.println();
    }
}

class Birds{
    String name;
    int noOfLegs;
    boolean canFly;
    Birds(String name,int noOfLegs,boolean canFly){
        this.name = name;
        this.noOfLegs = noOfLegs;
        this.canFly = canFly;
    }
    void display(){
        System.out.println(name + " has "+noOfLegs+" legs");
        if(canFly){
            System.out.println(name+" can fly");
        }else{
            System.out.println(name+" cannot fly");
        }
    }

}

public class Main {
    public static void main(String[] args) {

        Dog dog = new Dog();
        dog.talk();

        //abstraction and inheritance
        Cat cat =new Cat();
        cat.eat();
        cat.walk();

        //overloading
        Reptile snake = new Reptile();
        snake.species();
        snake.species("Anaconda");

        //overriding
        Crocodile crocodile = new Crocodile();
        crocodile.species("Alligator");

        //constructors
        Mammals mammals = new Mammals();//default constructor
        Mammals cow = new Mammals("cow");//parameterized constructor

        Birds penguin = new Birds("penguin",2,false);
        penguin.display();

    }
}