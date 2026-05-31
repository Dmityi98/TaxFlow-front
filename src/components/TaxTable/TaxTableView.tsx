import React from 'react';
import { YearDTO } from '../../types';
import './TaxTable.css';

const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

interface TaxTableViewProps {
  yearData: YearDTO;
  onCellChange?: (quarterIndex: number, monthIndex: number, field: string, value: number | null) => void;
  editable?: boolean;
}

const TaxTableView: React.FC<TaxTableViewProps> = ({ yearData, onCellChange, editable = false }) => {
  const calculateTax = (turnover: number | null | undefined): number | null => {
    if (turnover === null || turnover === undefined) return null;
    return Number((turnover * 0.06).toFixed(2));
  };

  const calculateQuarterTotal = (quarterIndex: number, field: string): number => {
    const quarter = yearData.quarters[quarterIndex];
    if (!quarter) return 0;
    
    return quarter.columns.reduce((sum, col) => {
      const value = field === 'turnover' ? col.turnover : 
                    field === 'tax' ? calculateTax(col.turnover) :
                    field === 'taxPayable' ? col.taxPayable : 
                    field === 'paidTax' ? col.paidTax : 0;
      return sum + (value || 0);
    }, 0);
  };  

  const handleCellChange = (
    quarterIndex: number,
    monthIndex: number,
    field: string,
    value: string
  ) => {
    if (!onCellChange || !editable) return;
    
    const numValue = value === '' ? 0 : parseFloat(value);
    if (!isNaN(numValue) || value === '') {
      onCellChange(quarterIndex, monthIndex, field, numValue);
    }
  };

  return (
    <div className="tax-table-container">
      <h2 className="tax-table-title">{yearData.nameTable}</h2>
      
      {yearData.quarters.map((quarter, qIndex) => (
        <div key={quarter.id} className="quarter-section">
          <h3 className="quarter-title">Квартал {qIndex + 1}</h3>
          <div className="tax-table-wrapper">
            <table className="tax-table">
              <thead>
                <tr>
                  <th>Месяц</th>
                  <th>Оборот</th>
                  <th>Налог УСН (0.6%)</th>
                  <th>Страховые взносы</th>
                  <th>Налог к оплате</th>
                  <th>Оплаченный налог</th>
                </tr>
              </thead>
              <tbody>
                {quarter.columns.map((column, mIndex) => {
                  const tax = calculateTax(column.turnover);

                  
                  return (
                    <tr key={column.id}>
                      <td className="month-cell">{monthNames[column.month]}</td>
                      <td>
                        {editable ? (
                          <input
                            type="number"
                            className="table-input"
                            value={column.turnover ?? ''}
                            onChange={(e) => handleCellChange(qIndex, mIndex, 'turnover', e.target.value)}
                            placeholder="0.00"
                            step="0.01"
                          />
                        ) : (
                          <span>{column.turnover?.toFixed(2) || '-'}</span>
                        )}
                      </td>
                      <td className="tax-calculated">
                        {tax?.toFixed(2) || '-'}
                      </td>
                      <td>
                        {editable ? (
                          <input
                            type="number"
                            className="table-input"
                            value={column.taxPayable ?? ''}
                            onChange={(e) => handleCellChange(qIndex, mIndex, 'taxPayable', e.target.value)}
                            placeholder="0.00"
                            step="0.01"
                          />
                        ) : (
                          <span>{column.taxPayable?.toFixed(2) || '-'}</span>
                        )}
                      </td>
                      <td>
                        {editable ? (
                          <input
                            type="number"
                            className="table-input"
                            value={column.paidTax ?? ''}
                            onChange={(e) => handleCellChange(qIndex, mIndex, 'paidTax', e.target.value)}
                            placeholder="0.00"
                            step="1"
                          />
                        ) : (
                          <span>{column.paidTax?.toFixed(2) || '-'}</span>
                        )}
                      </td>
                       <td>
                      {editable ? (
                        <input
                          type="number"
                          className="table-input"
                          value={column.paidTax ?? ''}
                          onChange={(e) => handleCellChange(qIndex, mIndex, 'paidTax', e.target.value)}
                          placeholder="0.00"
                          step="0.01" // Обязательно 0.01 для копеек!
                        />
                      ) : (
                        <span>{column.paidTax?.toFixed(2) || '-'}</span>
                      )}
                    </td>
                    </tr>
                  );
                })}
                <tr className="quarter-total">
                  <td><strong> Итог за {qIndex + 1} квартал</strong></td>
                  <td><strong>{calculateQuarterTotal(qIndex, 'turnover').toFixed(2)}</strong></td>
                  <td><strong>{calculateQuarterTotal(qIndex, 'tax').toFixed(2)}</strong></td>
                  <td><strong>{calculateQuarterTotal(qIndex, 'taxPayable').toFixed(2)}</strong></td>
                  <td><strong>{calculateQuarterTotal(qIndex, 'paidTax').toFixed(2)}</strong></td>
                  <td>
                    <strong>
                      {(calculateQuarterTotal(qIndex, 'paidTax') - calculateQuarterTotal(qIndex, 'taxPayable')).toFixed(2)}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
      
      <div className="year-summary">
        <h3>Итоги года</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Total Turnover:</span>
            <span className="summary-value">
              {yearData.quarters.reduce((sum, q) => sum + calculateQuarterTotal(yearData.quarters.indexOf(q), 'turnover'), 0).toFixed(2)} руб.
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Tax:</span>
            <span className="summary-value">
              {yearData.quarters.reduce((sum, q) => sum + calculateQuarterTotal(yearData.quarters.indexOf(q), 'tax'), 0).toFixed(2)} руб.
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Tax Payable:</span>
            <span className="summary-value">
              {yearData.quarters.reduce((sum, q) => sum + calculateQuarterTotal(yearData.quarters.indexOf(q), 'taxPayable'), 0).toFixed(2)} руб.
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Paid:</span>
            <span className="summary-value">
              {yearData.quarters.reduce((sum, q) => sum + calculateQuarterTotal(yearData.quarters.indexOf(q), 'paidTax'), 0).toFixed(2)} руб.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxTableView;
