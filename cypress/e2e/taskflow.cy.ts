/// <reference types="cypress" />

describe('TaskFlow', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173')
    })
  
    it('opens the application', () => {
      cy.contains('TaskFlow').should('be.visible')
    })
  
    it('adds a new task', () => {
      cy.contains('+ Add Task').click()
  
      cy.get('input[placeholder="Task name"]')
        .type('Buy school supplies')
  
      cy.get('textarea[placeholder="Description"]')
        .type('Buy notebooks and pencils for the kids.')
  
      cy.get('input[type="date"]')
        .type('2026-10-05')
  
      cy.contains('Save Task').click()
  
      cy.contains('Buy school supplies')
        .should('be.visible')
  
      cy.contains('Buy notebooks and pencils for the kids.')
        .should('be.visible')
    })
  
    it('edits an existing task', () => {
      cy.contains('Grocery shopping')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Edit').click()
        })
  
      cy.get('input[placeholder="Task name"]')
        .clear()
        .type('Grocery shopping - Updated')
  
      cy.get('textarea[placeholder="Description"]')
        .clear()
        .type('Buy groceries for the whole week.')
  
      cy.contains('Save Task').click()
  
      cy.contains('Grocery shopping - Updated')
        .should('be.visible')
  
      cy.contains('Buy groceries for the whole week.')
        .should('be.visible')
    })
  
    it('deletes an existing task', () => {
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(true)
      })
  
      cy.contains('Grocery shopping')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Delete').click()
        })
  
      cy.contains('Grocery shopping')
        .should('not.exist')
    })
  
    it('completes and reopens a task', () => {
      cy.contains('Doctor appointment')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Complete').click()
        })
  
      cy.contains('Doctor appointment')
        .parent()
        .parent()
        .should('contain', 'Completed')
  
      cy.contains('Doctor appointment')
        .parent()
        .parent()
        .within(() => {
          cy.contains('Undo').click()
        })
  
      cy.contains('Doctor appointment')
        .parent()
        .parent()
        .should('contain', 'Pending')
    })
  
    it('searches for a task', () => {
      cy.get('input[placeholder="Search tasks..."]')
        .type('Grocery')
  
      cy.contains('Grocery shopping')
        .should('be.visible')
  
      cy.contains('Doctor appointment')
        .should('not.exist')
    })
  })