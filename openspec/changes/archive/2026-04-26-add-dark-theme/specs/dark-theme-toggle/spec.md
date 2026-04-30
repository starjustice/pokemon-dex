## ADDED Requirements

### Requirement: Theme toggle button
The system SHALL display a theme toggle button in the page header that cycles through light, dark, and system modes. The button SHALL show a sun icon in light mode, a moon icon in dark mode, and a monitor icon in system mode.

#### Scenario: Toggle from light to dark
- **WHEN** the user clicks the theme toggle while in light mode
- **THEN** the theme switches to dark mode, the icon changes to a moon, and the `.dark` class is added to `<html>`

#### Scenario: Toggle from dark to system
- **WHEN** the user clicks the theme toggle while in dark mode
- **THEN** the theme switches to system mode, the icon changes to a monitor, and the theme follows the OS preference

#### Scenario: Toggle from system to light
- **WHEN** the user clicks the theme toggle while in system mode
- **THEN** the theme switches to light mode, the icon changes to a sun, and the `.dark` class is removed from `<html>`

### Requirement: Theme persistence
The system SHALL persist the user's theme preference in `localStorage`. On subsequent visits, the system SHALL restore the saved preference.

#### Scenario: Theme restored on revisit
- **WHEN** the user has previously selected dark mode and revisits the site
- **THEN** the site loads in dark mode without a flash of light theme

#### Scenario: Default to system preference
- **WHEN** no theme preference is stored in `localStorage`
- **THEN** the system SHALL use the OS-level color scheme preference

### Requirement: No flash of wrong theme
The system SHALL prevent a flash of incorrect theme (FOHT) on page load by applying the stored theme before first paint using a blocking inline script.

#### Scenario: Dark preference loads without flash
- **WHEN** the user has dark mode saved and loads the page
- **THEN** the page renders in dark mode from the first paint with no visible flash of light theme

### Requirement: Theme provider wraps application
The system SHALL wrap the application in a theme provider component that manages theme state and provides it to all components. The provider SHALL use class-based dark mode strategy.

#### Scenario: Provider configures class strategy
- **WHEN** the application renders
- **THEN** the theme provider applies `attribute="class"` so that `.dark` is toggled on `<html>` based on the active theme
