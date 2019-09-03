import { TestBed } from '@angular/core/testing';

import { AtividadeKanbanService } from './atividade-kanban.service';

describe('AtividadeKanbanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtividadeKanbanService = TestBed.get(AtividadeKanbanService);
    expect(service).toBeTruthy();
  });
});
