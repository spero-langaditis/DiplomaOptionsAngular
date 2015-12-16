//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OptionsApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Choice
    {
        public int ChoiceId { get; set; }
        public int YearTermId { get; set; }
        public string StudentId { get; set; }
        public string StudentFirstName { get; set; }
        public string StudentLastName { get; set; }
        public int FirstChoiceOptionId { get; set; }
        public int SecondChoiceOptionId { get; set; }
        public int ThirdChoiceOptionId { get; set; }
        public int FourthChoiceOptionId { get; set; }
        public System.DateTime SelectionDate { get; set; }
        public Nullable<int> Option_OptionId { get; set; }
    
        public virtual Option Option { get; set; }
        public virtual Option Option1 { get; set; }
        public virtual Option Option2 { get; set; }
        public virtual Option Option3 { get; set; }
        public virtual Option Option4 { get; set; }
        public virtual YearTerm YearTerm { get; set; }
    }
}
