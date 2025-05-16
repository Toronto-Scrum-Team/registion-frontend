/**
 * TypeScript Declaration File for @testing-library/jest-dom
 *
 * This file is necessary to provide TypeScript type definitions for the DOM testing
 * matchers provided by @testing-library/jest-dom, such as:
 * - toBeInTheDocument()
 * - toHaveTextContent()
 * - toBeDisabled()
 *
 * Without this file, TypeScript will show errors like:
 * "Property 'toBeInTheDocument' does not exist on type 'JestMatchers<HTMLElement>'"
 *
 * The file extends the Jest namespace to include these custom matchers, allowing
 * TypeScript to recognize them in test files.
 */

import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(content: string | RegExp): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeEmpty(): R;
      toBeEmptyDOMElement(): R;
      toBeInvalid(): R;
      toBeRequired(): R;
      toBeValid(): R;
      toBeVisible(): R;
      toContainElement(element: HTMLElement | null): R;
      toContainHTML(htmlText: string): R;
      toHaveAttribute(attr: string, value?: string | RegExp): R;
      toHaveClass(...classNames: string[]): R;
      toHaveFocus(): R;
      toHaveFormValues(expectedValues: Record<string, any>): R;
      toHaveStyle(css: string | Record<string, any>): R;
      toHaveValue(value?: string | string[] | number | null): R;
    }
  }
}

// This export is necessary to make TypeScript treat this as a module
export {};
