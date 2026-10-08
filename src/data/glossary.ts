// Shared definitions for <Term> in posts: hovering, focusing or tapping the
// term shows its definition. Add an entry once, use it in any post:
//
//   <Term id="qubit" />                 → shows "qubit", explains it
//   <Term id="qubit">qubits</Term>      → your own wording, same definition
//
// Keys are lower-case with hyphens. Definitions are plain text (no Markdown
// or math), one or two sentences.

export interface GlossaryEntry {
  /** How the term is written when <Term> has no text of its own */
  term: string;
  definition: string;
}

export const glossary: Record<string, GlossaryEntry> = {
  qubit: {
    term: 'qubit',
    definition:
      'The basic unit of quantum information: a two-level quantum system that can be in a superposition of |0⟩ and |1⟩.',
  },
  superposition: {
    term: 'superposition',
    definition:
      'A quantum state that is a weighted sum of other states; measuring it gives one of them, with probabilities set by the weights.',
  },
  entanglement: {
    term: 'entanglement',
    definition:
      'A correlation between quantum systems that no description of each system on its own can capture; measuring one affects what the other gives.',
  },
  'bloch-sphere': {
    term: 'Bloch sphere',
    definition: "A sphere whose points are the pure states of a single qubit; the poles are |0⟩ and |1⟩.",
  },
  unitary: {
    term: 'unitary',
    definition:
      'A transformation that preserves lengths and angles between states (U†U = I); every closed quantum evolution and every quantum gate is one.',
  },
  hamiltonian: {
    term: 'Hamiltonian',
    definition: "The operator for a system's total energy; it generates how the system evolves in time.",
  },
  'gradient-descent': {
    term: 'gradient descent',
    definition:
      'An optimization method that repeatedly steps against the gradient of a loss function to find a (local) minimum.',
  },
};
