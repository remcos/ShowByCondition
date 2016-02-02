# Documentation

## Description
By default, Mendix allows to make elements conditionally visible based on a boolean value within the attribute. This widget allows for much more functionality, by enabling the connection of a Microflow.

## Typical usage scenario
* Show a container with associated objects only when there are associated objects.
*	Show a field based on the status of a related object.

## Features and limitations
*	Show an element based on a boolean value resulting from any Microflow.
*	Only works within elements that should be displayed as a 'block'.

## Configuration
1.	Create a microflow that has the Context Entity as input parameter.
2.	End the microflow with a boolean value, which determines whether an element should be shown (true) or not (false).
3.	Add the widget inside the element that you want to show or hide. This element can of course contain more sub-elements.
