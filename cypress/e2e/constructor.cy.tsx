const buns = 'Краторная булка N-200i';
const ingredient = 'Филе Люминесцентного тетраодонтимформа';

describe('Оформление заказа через конструктор', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('/');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('Тест на оформление заказа пользователем', () => {
    // открытие и закрытие модального окна по клику на крестик и на оверлей
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-link"]').as('ingredient-link');
    cy.get('@ingredient-link').filter(`:contains("${buns}")`).find('a').click();
    cy.get('[data-cy="modal"]').as('modal');
    cy.get('@modal').should('be.visible');
    cy.get('@modal').should('contain', buns);
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('not.exist');

    cy.get('@ingredient-link').filter(`:contains("${buns}")`).find('a').click();
    cy.get('@modal').should('be.visible');
    cy.get('@modal').should('contain', buns);
    cy.get('[data-cy="overlay"]').click(10, 20, { force: true });
    cy.get('@modal').should('not.exist');

    // добавление булки в конструктор
    cy.get('@ingredient-link')
      .filter(`:contains("${buns}")`)
      .find('button')
      .click();
    cy.get('[data-cy="burger-bun"]').as('burger-bun');
    cy.get('@burger-bun').contains(buns);

    // добавление ингредиент в конструктор
    cy.get('@ingredient-link')
      .filter(`:contains("${ingredient}")`)
      .find('button')
      .click();
    cy.get('[data-cy="burger-ingredient"]').as('burger-ingredient');
    cy.get('@burger-ingredient').contains(ingredient);

    // оформление заказа по клику на кнопку
    cy.get('[data-cy="burger-constructor-footer"]').find('button').click();
    cy.wait('@getUser');
    cy.wait('@postOrder');
    cy.get('@modal').should('be.visible').contains('61092');
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('not.exist');

    // очищение конструктора после оформления заказа
    cy.get('@burger-bun').should('not.exist');
    cy.get('@burger-ingredient').should('not.exist');
  });
});
