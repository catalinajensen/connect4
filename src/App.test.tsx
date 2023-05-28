import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('renders page elements', () => {
  render(<App />);
  const header = screen.getByTestId(/header/i);
  expect(header).toBeInTheDocument();
  expect(header).toHaveClass('header player_1');

  expect(screen.getByText(/player 1 turn/i)).toBeInTheDocument();

  expect(screen.getByRole('table')).toBeInTheDocument();

  const rows = screen.getAllByRole('row');
  expect(rows.length).toBe(6);

  const cells = screen.getAllByRole('cell');
  expect(cells.length).toBe(42);
});

test('renders table', () => {
  render(<App />);

  const rows = screen.getAllByRole('row');

  const cells = within(rows[5]).getAllByTestId(/gamecell/i);

  expect(cells.length).toBe(7);

  const circle_5_0 = within(cells[0]).getByTestId(/circle/i);
  const circle_5_1 = within(cells[1]).getByTestId(/circle/i);

  expect(circle_5_0).toHaveClass('circle');
  expect(circle_5_0).not.toHaveClass('player_1');
  expect(circle_5_1).not.toHaveClass('player_1');

  fireEvent.click(cells[0]);

  expect(circle_5_0).toHaveClass('player_1');
  expect(circle_5_1).not.toHaveClass('player_1');

  fireEvent.click(cells[1]);

  expect(circle_5_0).toHaveClass('player_1');
  expect(circle_5_1).toHaveClass('player_2');
});

test('renders end game', () => {
  render(<App />);

  const rows = screen.getAllByRole('row');

  // player 1 win scenario
  const cells_5 = within(rows[5]).getAllByTestId(/gamecell/i);
  const cells_4 = within(rows[4]).getAllByTestId(/gamecell/i);

  fireEvent.click(cells_5[0]);
  fireEvent.click(cells_4[0]);

  fireEvent.click(cells_5[1]);
  fireEvent.click(cells_4[1]);

  fireEvent.click(cells_5[2]);
  fireEvent.click(cells_4[2]);

  fireEvent.click(cells_5[3]);

  const header = screen.getByTestId(/header/i);
  expect(header).toHaveClass('header end');
  expect(screen.getByText(/player 1 wins/i)).toBeInTheDocument();

  const newGameButton = screen.getByRole('button', { name: /new game/i });

  expect(newGameButton).toBeInTheDocument();

  //starts new game
  fireEvent.click(newGameButton);

  expect(header).toHaveClass('header player_1');
  expect(screen.getByText(/player 1 turn/i)).toBeInTheDocument();

  expect(newGameButton).not.toBeInTheDocument();
});
